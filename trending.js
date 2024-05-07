function createTrendingMoviesSection(data) {
  const trendingMoviesContainer = document.querySelector(
    ".trendingMoviesContainer"
  );
  if (data.length === 0) {
    const paragraph = document.createElement("p");
    paragraph.innerText = "No movies or TV series found";
    paragraph.classList.add("notFoundText");
    trendingMoviesContainer.appendChild(paragraph);
  }
  data.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movieCardNew");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movieCoverNew");
    movieImg.src =
      movie.thumbnail &&
      movie.thumbnail.regular &&
      movie.thumbnail.regular.medium;
    movieImg.alt = movie.title;

    const infoElement = document.createElement("div");
    infoElement.classList.add("movieInfoNew");
    infoElement.innerHTML = `  <p class = "year">${movie.year}</p>
    <p class = "category">${movie.category}</p>
    <p class = "rating">${movie.rating}</p>
    <p class = "title">${movie.title}</p>`;

    // modal
    const playButton = document.createElement("button");
    playButton.classList.add("playButton");
    playButton.textContent = "Play";

    movieCard.addEventListener("mouseenter", () => {
      playButton.style.display = "block";
    });

    movieCard.addEventListener("mouseleave", () => {
      playButton.style.display = "none";
    });

    playButton.addEventListener("click", () => {
      openModal(movie);
      disableScroll();
    });
    // modal
    const bookmarkIcon = document.createElement("img");
    bookmarkIcon.src = movie.isBookmarked
      ? "./assets/icon-bookmark-full.svg"
      : "./assets/icon-bookmark-empty.svg";
    bookmarkIcon.alt = movie.isBookmarked ? "Bookmark(full)" : "Bookmark";
    bookmarkIcon.classList.add("bookmarkIcon");

    const bookmarkContainer = document.createElement("div");
    bookmarkContainer.classList.add("bookmarkContainer");
    bookmarkContainer.appendChild(bookmarkIcon);

    movieCard.appendChild(movieImg);
    movieCard.appendChild(bookmarkContainer);
    movieCard.appendChild(infoElement);
    trendingMoviesContainer.appendChild(movieCard);
    movieCard.appendChild(playButton);
  });
}

function openModal(movie) {
  const modalBackdrop = document.createElement("div");
  modalBackdrop.classList.add("modal-backdrop");
  wrapperMain.appendChild(modalBackdrop);

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalBackdrop.appendChild(modalContent);

  const movieImg = document.createElement("img");
  movieImg.classList.add("modal-movie-img");
  movieImg.src =
    movie.thumbnail && movie.thumbnail.regular && movie.thumbnail.regular.large;
  movieImg.alt = movie.title;
  modalContent.appendChild(movieImg);

  const movieTitle = document.createElement("h2");
  movieTitle.classList.add("modal-title");
  movieTitle.textContent = movie.title;
  modalContent.appendChild(movieTitle);

  const movieDirector = document.createElement("p");
  movieDirector.classList.add("modal-director");
  movieDirector.textContent = "Director: " + movie.director;
  modalContent.appendChild(movieDirector);

  const movieDescription = document.createElement("p");
  movieDescription.classList.add("modal-description");
  movieDescription.textContent = movie.description;
  modalContent.appendChild(movieDescription);

  const closeButton = document.createElement("button");
  closeButton.classList.add("closeButton");
  closeButton.textContent = "×";
  closeButton.addEventListener("click", () => {
    closeModal();
    enableScroll();
  });
  modalContent.appendChild(closeButton);
}

function closeModal() {
  const modalBackdrop = document.querySelector(".modal-backdrop");
  wrapperMain.removeChild(modalBackdrop);
}

function disableScroll(){
  document.body.classList.add("disable-scroll");
}

function enableScroll(){
  document.body.classList.remove("disable-scroll");
};

const container = document.querySelector(".trendingMoviesContainer");
let isDown = false;
let startX;
let scrollLeft;

container.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

container.addEventListener("mouseleave", () => {
  isDown = false;
});

container.addEventListener("mouseup", () => {
  isDown = false;
});

container.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 3;
  container.scrollLeft = scrollLeft - walk;
});
