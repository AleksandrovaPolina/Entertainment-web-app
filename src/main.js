// Функция для получения фильмов из API
document.addEventListener("DOMContentLoaded", function () {
  const api_key = "7abb31d8-f85d-47c0-97bc-f25c197dd055";
  const wrapperMain = document.querySelector(".wrapper-main");
  const modalBackdrop = document.createElement("div");
  const modalContent = document.querySelector(".modal-content");
  let totalPages = 0;

  async function getMovies(page, type = "ALL", title = "") {
    const api_url = `https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&genres=1&order=RATING&type=${type}&ratingFrom=0&ratingTo=10&yearFrom=2000&yearTo=2024&page=${page}`;

    try {
      const res = await fetch(api_url, {
        headers: {
          "X-API-KEY": api_key,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      const resData = await res.json();
      totalPages = resData.pagesCount;
      viewMovies(resData, title);
    } catch (error) {
      document.querySelector(".errorMessage").innerHTML = `
      <img class="error-img" src="./assets/gear.png" alt="Gear">
      <h3 class="error-title">We're sorry.</h3>
      <p class="error-text">Something went wrong. We're working on the problem. Please try later</p>`;
    }
  }

  // Функция для отображения фильмов на странице

  function viewMovies(data, title) {
    const containerMain = document.querySelector(".container-main");
    containerMain.innerHTML = "";

 
  

    data.items.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movieCard");
      movieCard.setAttribute("id", `${movie.kinopoiskId}`);
      movieCard.innerHTML = `
          <img src="${movie.posterUrlPreview}" 
          alt="${movie.nameOriginal}" 
          class="movieCover">
          <div class="movieInfo">
          <p class="movieYear">${movie.year}</p>
          <p class="movieCategory">${
            movie.type.toLowerCase().replace("_", " ").charAt(0).toUpperCase() +
            movie.type.toLowerCase().replace("_", " ").slice(1)}</p>
          <p class="movieRating">${movie.ratingImdb}</p>
          </div>
          <h3 class="movieTitle">${movie.nameOriginal}</h3>
          <button class="playButton">More info</button>`;

      movieCard.addEventListener("click", () => {
        openModal(movie);
        disableScroll();
      });
      containerMain.appendChild(movieCard);
    });
  }


  async function openModal(movie) {
    const api_url_modal = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
    const id = movie.kinopoiskId;
    try{
      const res = await fetch(api_url_modal + id, {
        headers: {
          "X-API-KEY": api_key,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const resData = await res.json();
      modalBackdrop.classList.add('modal-backdrop');
      wrapperMain.appendChild(modalBackdrop);
      modalBackdrop.innerHTML = `
      <div class="modal-content">
        <img class="modal-movie-img"
        src="${resData.posterUrl}" 
        alt="${resData.nameOriginal}" >
        <h2 class="modal-title">${resData.nameOriginal} (${resData.year})</h2>
        <p class="modal-year">Продолжительность: ${resData.filmLength} мин.</p>
        <p class="modal-genre">Жанр: ${resData.genres.map((el) => el.genre).join(", ")}</p>
        <p class="modal-site">Трейлер можно посмотреть <a class="modal-site-link" href="${resData.webUrl}/video" target="_blank">здесь</a></p>
        <p class="modal-description">${resData.description}</p>
        <button class="closeButton">✕</button>
        </div>`
      
      const closeBtn = document.querySelector(".closeButton");
      closeBtn.addEventListener("click", () => {
        closeModal();
        enableScroll();
      });  
    }
    catch(error){
      const modalError = document.createElement("div");
      modalError.classList.add("modal-error");
      modalError.innerHTML = `
      <img class="error-img" src="./assets/gear.png" alt="Gear">
      <h3 class="error-title">We're sorry.</h3>
      <p class="error-text">Something went wrong. We're working on the problem. Please try later</p>`;
      modalContent.appendChild(modalError);
    }
  }

  function closeModal() {
    if (modalBackdrop && modalBackdrop.parentNode) {
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    };
    enableScroll();
  }

  window.addEventListener("click", (e) => {
    
    if (e.target != modalContent) {
      closeModal();
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  function disableScroll(){
    document.body.classList.add("disable-scroll");
  };
  
  function enableScroll(){
    document.body.classList.remove("disable-scroll");
  };
  

  ////////////////////////////Пагинация/////////////////////////////////////////////////

  function createPagination(type = "ALL", title = "") {
    let currentPage = 1;
    function handlePrevPage() {
      if (currentPage > 1) {
        currentPage--;
        getMovies(currentPage, type, title);
      }
    }

    function handleNextPage() {
      currentPage++;
      getMovies(currentPage, type, title);
    }

    getMovies(currentPage);

    const paginationContainer = document.createElement("div");
    paginationContainer.classList.add("pagination");
    wrapperMain.appendChild(paginationContainer);

    paginationContainer.innerHTML = `
    <button class="btnPage" id="prevButton">Previous</button>
    <button class="btnPage" id="nextButton">Next</button>`
  
    document.getElementById("prevButton").addEventListener("click", handlePrevPage);
    document.getElementById("nextButton").addEventListener("click", handleNextPage);
    
  }
  createPagination("ALL", "Recommended for you");

   ////////////////////////////Фильтрация/////////////////////////////////////////////////

  const moviesButton = document.getElementById("moviesButton");
  const seriesButton = document.getElementById("seriesButton");
  const bookmarkButton = document.getElementById("bookmarkButton");
  const homeButton = document.getElementById("homeButton");

  homeButton.addEventListener("click", () => {
    showHomePage();
    changeTitle("Recommended for you");
  })
  moviesButton.addEventListener("click", () => {
    getMovies(1, "FILM", "Movies");
    hideTrendingSection();
    changeTitle("Movies");
  });
  
  seriesButton.addEventListener("click", () => {
    getMovies(1, "TV_SERIES", "TV Series");
    hideTrendingSection();
    changeTitle("TV Series");
  });
  
  bookmarkButton.addEventListener("click", () => {
    // закладки
  });

  function hideTrendingSection() {
    const trendingSection = document.querySelector(".trendingMovies");
    trendingSection.style.display = "none";
  }

  function changeTitle(title){
    const titleRecomend = document.querySelector('#recommended');
    titleRecomend.innerHTML = title;
  }

  function showHomePage() {
    const trendingSection = document.querySelector(".trendingMovies");
    trendingSection.style.display = "block";
    const titleRecomend = document.querySelector('#recommended');
    titleRecomend.style.display = "block";
    
  
    getMovies(1, "ALL", "");
  }




});




