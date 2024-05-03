<<<<<<< HEAD
fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    createDOMStructure(data.filter((movie) => !movie.isTrending));
    createTrendingSection(data.filter((movie) => movie.isTrending));
    addHorizontalScroll();
=======
let movies; 
const wrapperMain = document.querySelector('.wrapper-main');

fetch('./data.json')
  .then(res => res.json())
  .then(data => {
    movies = data.filter(movie => !movie.isTrending);
    createDOMStructure(movies);
>>>>>>> master
  })
  .catch((error) => {
    console.error("Ошибка загрузки или обработки JSON:", error);
  });

function createDOMStructure(data) {
<<<<<<< HEAD
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
=======
  data.forEach(movie => {
    const container = document.querySelector('.container');
    const movieElement = document.createElement('div');
    movieElement.classList.add('movieCard');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movieCover');
    movieImg.src = movie.thumbnail && movie.thumbnail.regular && movie.thumbnail.regular.medium;
    movieImg.alt = movie.title;

    const playButton = document.createElement('button');
    playButton.classList.add('playButton');
    playButton.textContent = 'Play';

    movieElement.addEventListener('mouseenter', () => {
      playButton.style.display = 'block'; 
    });

    movieElement.addEventListener('mouseleave', () => {
      playButton.style.display = 'none'; 
    });

    playButton.addEventListener('click', () => {
      openModal(movie);
    });

    const infoElement = document.createElement('div');
    infoElement.classList.add('movieInfo');
>>>>>>> master

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

    wrapperMain.appendChild(container);
    container.appendChild(movieElement);
    movieElement.appendChild(movieImg);
    infoElement.appendChild(yearElement);
    infoElement.appendChild(categoryElement);
    infoElement.appendChild(ratingElement);
    movieElement.appendChild(infoElement);
    movieElement.appendChild(titleElement);
<<<<<<< HEAD
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
=======
    movieElement.appendChild(playButton);    
  });
>>>>>>> master
}

function openModal(movie) {
  const modalBackdrop = document.createElement('div');
  modalBackdrop.classList.add('modal-backdrop');
  wrapperMain.appendChild(modalBackdrop);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalBackdrop.appendChild(modalContent);

  const movieImg = document.createElement('img');
  movieImg.classList.add('modal-movie-img');
  movieImg.src = movie.thumbnail && movie.thumbnail.regular && movie.thumbnail.regular.large;
  movieImg.alt = movie.title;
  modalContent.appendChild(movieImg);

  const movieTitle = document.createElement('h2');
  movieTitle.classList.add('modal-title');
  movieTitle.textContent = movie.title;
  modalContent.appendChild(movieTitle);

  const movieDirector = document.createElement('p');
  movieDirector.classList.add('modal-director');
  movieDirector.textContent = 'Director: ' + movie.director;
  modalContent.appendChild(movieDirector);

  const movieDescription = document.createElement('p');
  movieDescription.classList.add('modal-description');
  movieDescription.textContent = movie.description;
  modalContent.appendChild(movieDescription);

  const closeButton = document.createElement('button');
  closeButton.classList.add('closeButton');
  closeButton.textContent = '×';
  closeButton.addEventListener('click', closeModal);
  modalContent.appendChild(closeButton);

  wrapperMain.classList.add('modal-open');
};

function closeModal() {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  wrapperMain.removeChild(modalBackdrop);
  wrapperMain.classList.remove('modal-open');
};



