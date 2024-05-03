fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    createDOMStructure(data.filter((movie) => !movie.isTrending));
    createTrendingSection(data.filter((movie) => movie.isTrending));
    addHorizontalScroll();
  })
  .catch((error) => {
    console.error("Ошибка загрузки или обработки JSON:", error);
  });

function createDOMStructure(data) {
  data.forEach((movie) => {
    const container = document.querySelector(".container");

    const movieElement = document.createElement("div");
    movieElement.classList.add("movieCard");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movieCover");
    movieImg.src =
      movie.thumbnail &&
      movie.thumbnail.regular &&
      movie.thumbnail.regular.medium; // Обратите внимание на изменение пути к изображению
    movieImg.alt = movie.title;

    const infoElement = document.createElement("div");
    infoElement.classList.add("movieInfo");

    const yearElement = document.createElement("p");
    yearElement.classList.add("movieYear");
    yearElement.textContent = movie.year;

    const categoryElement = document.createElement("p");
    categoryElement.classList.add("movieCategory");
    categoryElement.textContent = movie.category;

    const ratingElement = document.createElement("p");
    ratingElement.classList.add("movieRating");
    ratingElement.textContent = movie.rating;

    const titleElement = document.createElement("h3");
    titleElement.classList.add("movieTitle");
    titleElement.textContent = movie.title;

    //Добавление элементов к DOM
    container.appendChild(movieElement);
    movieElement.appendChild(movieImg);
    infoElement.appendChild(yearElement);
    infoElement.appendChild(categoryElement);
    infoElement.appendChild(ratingElement);
    movieElement.appendChild(infoElement);
    movieElement.appendChild(titleElement);
  });
}

function createTrendingSection(trendingMovies) {
  const trendingContainer = document.querySelector(".trending-container");

  trendingMovies.forEach((movie) => {
    const trendingMovie = document.createElement("div");
    trendingMovie.classList.add("trending-movie");

    const trendingImg = document.createElement("img");
    trendingImg.classList.add("trending-cover");
    trendingImg.src =
      movie.thumbnail &&
      movie.thumbnail.regular &&
      movie.thumbnail.regular.medium;
    trendingImg.alt = movie.title;

    const trendingTitle = document.createElement("h3");
    trendingTitle.classList.add("trending-title");
    trendingTitle.textContent = movie.title;

    trendingMovie.appendChild(trendingImg);
    trendingMovie.appendChild(trendingTitle);

    trendingContainer.appendChild(trendingMovie);
  });
}

function addHorizontalScroll() {
  const trendingContainer = document.getElementById("trendingContainer");
  trendingContainer.style.overflowX = "scroll"; // Установка горизонтальной прокрутки
  // Дополнительные настройки по вашему усмотрению
}
