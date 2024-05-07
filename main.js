const api_key = "7abb31d8-f85d-47c0-97bc-f25c197dd055";
const wrapperMain = document.querySelector(".wrapper-main");

// Функция для получения фильмов из API
async function getMovies(page) {
  const api_url = `https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&genres=1&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=2000&yearTo=2024&page=${page}`;
  
  const res = await fetch(api_url, {
    headers: {
      'X-API-KEY': api_key,
      'Content-Type': 'application/json',
    },
  });
  
  const resData = await res.json();
  viewMovies(resData);
}

// Функция для отображения фильмов на странице


function viewMovies(data){
  const containerMain = document.querySelector(".container-main");
  containerMain.innerHTML = ''; 
  
  data.items.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movieCard");
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
    containerMain.appendChild(movieCard);
  });
}

/////////////////////////////// Пагинация/////////////////////////////////////////////////

function pagination(){
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
pagination();