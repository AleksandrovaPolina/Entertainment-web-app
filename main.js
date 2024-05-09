// Функция для получения фильмов из API
document.addEventListener("DOMContentLoaded", function () {
  const api_key = "7abb31d8-f85d-47c0-97bc-f25c197dd055";
  const api_url_modal = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
  const wrapperMain = document.querySelector(".wrapper-main");
  const modalBackdrop = document.createElement("div");
  let totalPages = 0;

  async function getMovies(page) {
    const api_url = `https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&genres=1&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=2000&yearTo=2024&page=${page}`;

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
      viewMovies(resData);
    } catch (error) {
      document.querySelector(".errorMessage").innerHTML = `
      <img class="error-img" src="./assets/gear.png" alt="Gear">
      <h3 class="error-title">We're sorry.</h3>
      <p class="error-text">Something went wrong. We're working on the problem. Please try later</p>`;
    }
  }

  // Функция для отображения фильмов на странице

  function viewMovies(data) {
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
          <p class="movieRating">${movie.ratingImdb}/10</p>
          </div>
          <h3 class="movieTitle">${movie.nameOriginal}</h3>
          <button class="playButton">More</button>`;

      movieCard.addEventListener("click", () => {
        openModal(movie);
        disableScroll();
      });
      containerMain.appendChild(movieCard);
    });
  }


  async function openModal(movie) {
    const id = movie.kinopoiskId;

    const res = await fetch(api_url_modal + id, {
      headers: {
        "X-API-KEY": api_key,
        "Content-Type": "application/json",
      },
    });
    const resData = await res.json();

    modalBackdrop.classList.add('modal-backdrop');
    wrapperMain.appendChild(modalBackdrop);
    modalBackdrop.innerHTML = `
    <div class="modal-content">
      <img class="modal-movie-img"
      src="${resData.posterUrl}" 
      alt="${resData.nameOriginal}" >
      <h2 class="modal-title">${resData.nameOriginal}</h2>
      <p class="modal-year">${resData.year}</p>
      <p class="modal-genre">Жанр: ${resData.genres.map((el) => el.genre).join(", ")}</p>
      <p class="modal-description">${resData.description}</p>
      <button class="closeButton">x</button>
      </div>`
    
    const closeBtn = document.querySelector(".closeButton");
    closeBtn.addEventListener("click", () => {
      closeModal();
      enableScroll();
    });  
  }

  function closeModal() {
    wrapperMain.removeChild(modalBackdrop);
    enableScroll();
  }

  window.addEventListener("click", (e) => {
    const modalContent = document.querySelector(".modal-content")
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

  function createPagination() {
    let currentPage = 1;
    function handlePrevPage() {
      if (currentPage > 1) {
        currentPage--;
        getMovies(currentPage);
      }
    }

    function handleNextPage() {
      currentPage++;
      getMovies(currentPage);
    }

    getMovies(currentPage);

    const paginationContainer = document.createElement("div");
    paginationContainer.classList.add("pagination");

    const prevButton = document.createElement("button");
    prevButton.classList.add("btnPage");
    prevButton.textContent = "<Previous";
    prevButton.addEventListener("click", handlePrevPage);

    const nextButton = document.createElement("button");
    nextButton.classList.add("btnPage");
    nextButton.textContent = "Next>";
    nextButton.addEventListener("click", handleNextPage);

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);

    wrapperMain.appendChild(paginationContainer);
  }
  createPagination();
});
