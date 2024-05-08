
// Функция для получения фильмов из API
document.addEventListener("DOMContentLoaded", function() {
    const api_key = "7abb31d8-f85d-47c0-97bc-f25c197dd055";
    const api_url_modal = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
    const wrapperMain = document.querySelector(".wrapper-main");
    let totalPages = 0;

    async function getMovies(page) {
      const api_url = `https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&genres=1&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=2000&yearTo=2024&page=${page}`;
      try{
        const res = await fetch(api_url, {
          headers: {
            'X-API-KEY': api_key,
            'Content-Type': 'application/json',
          },
        });
    
        if(!res.ok){
          throw new Error (`Request failed: ${res.status}`)
        }
        const resData = await res.json();
        totalPages = resData.pagesCount;
        viewMovies(resData);
      }
    
      catch(error) {
        //document.querySelector('.errorMessage').textContent = error.message;
      }
    }
    
    // Функция для отображения фильмов на странице
    
    function viewMovies(data){
      const containerMain = document.querySelector(".container-main");
      containerMain.innerHTML = ''; 
      
      data.items.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movieCard");
        movieCard.setAttribute("id", `${movie.kinopoiskId}`)
        movieCard.innerHTML = `
          <img src="${movie.posterUrlPreview}" 
          alt="${movie.nameOriginal}" 
          class="movieCover">
          <div class="movieInfo">
          <p class="movieYear">${movie.year}</p>
          <p class="movieCategory">${movie.type.toLowerCase().replace('_', ' ').charAt(0).toUpperCase() + movie.type.toLowerCase().replace('_', ' ').slice(1)}</p>
          <p class="movieRating">${movie.ratingImdb}/10</p>
          </div>
          <h3 class="movieTitle">${movie.nameOriginal}</h3>`;
          movieCard.addEventListener('click', () => openModal(movie));
        containerMain.appendChild(movieCard);
      });
}

const modalElement  = document.createElement("div");
modalElement.classList.add("modal-backdrop");


    async function openModal(movie){
      const id = movie.kinopoiskId;

      const res = await fetch(api_url_modal + id, {
        headers: {
          'X-API-KEY': api_key,
          'Content-Type': 'application/json',
        },
      })
      const resData = await res.json(); 

      const modalElement  = document.createElement("div");
      modalElement.classList.add("modal-backdrop");
      const modalContent = document.createElement("div");
      modalContent.classList.add("modal-content");

      const movieImg = document.createElement("img");
      movieImg.classList.add("modal-movie-img");
      movieImg.src = resData.posterUrl; 
      movieImg.alt= resData.nameOriginal;
  
      const movieTitle = document.createElement("h2");
      movieTitle.classList.add("modal-title");
      movieTitle.textContent = resData.nameOriginal;
  
      const movieInfo = document.createElement("div");
      movieInfo.classList.add("movieInfo");
      
      const movieYear = document.createElement("p");
      movieYear.classList.add("modal-year");
      movieYear.textContent = resData.year;
  
      const movieGenre = document.createElement("p");
      movieGenre.classList.add("modal-genre");
      movieGenre.textContent = `Жанр: ${resData.genres.map((el) => el.genre).join(", ")}`;
  
      const movieDescription = document.createElement("p");
      movieDescription.classList.add("modal-description");
      movieDescription.textContent = resData.description;
  
      const closeButton = document.createElement("button");
      closeButton.classList.add("closeButton");
      closeButton.textContent = "x";
  
      modalContent.appendChild(movieImg);
      modalContent.appendChild(movieTitle);
      modalContent.appendChild(movieYear);
      modalContent.appendChild(movieGenre);
      modalContent.appendChild(movieDescription);
      modalContent.appendChild(closeButton);
      modalElement.appendChild(modalContent);
      wrapperMain.appendChild(modalElement);     

      const closeBtn = document.querySelector(".closeButton");
      closeBtn.addEventListener('click', () => closeModal());
    }

    function closeModal(){
      const modalBackdrop = document.querySelector(".modal-backdrop");
      wrapperMain.removeChild(modalBackdrop);
    }

    window.addEventListener("click", (e) => {
      if (e.target != modalElement) {
        closeModal();
      }
    })
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    })
    
    ////////////////////////////Пагинация/////////////////////////////////////////////////
    
    function createPagination(){
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
