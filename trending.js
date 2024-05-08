const api_url_trending =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1";

getTrending(api_url_trending);

async function getTrending(url) {
  try {
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "475b780a-eb7a-4f03-ab2c-288319493865",
      },
    });
    const respData = await resp.json();
    createTrendingMoviesSection(respData);
  } catch (error) {
    (document.getElementById("error").textContent = "Error trending movies:"),
      error;
    document.getElementById("result").textContent = "";
  } finally {
    document.getElementById("finallyResult").textContent = "Please try later";
  }
}

function createTrendingMoviesSection(data) {
  const trendingMoviesContainer = document.querySelector(
    ".trendingMoviesContainer"
  );

  data.items.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movieCardNew");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movieCoverNew");
    movieImg.src = movie.posterUrlPreview;
    movieImg.alt = movie.title;

    const infoElement = document.createElement("div");
    infoElement.classList.add("movieInfoNew");
    infoElement.innerHTML = `  <p class = "year">${movie.year}</p>
    <p class = "category">${movie.type}</p>
    <p class = "rating">${movie.ratingKinopoisk}</p>
    <p class = "title">${
      movie.nameOriginal ? movie.nameOriginal : movie.nameRu
    }</p>`;

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

    movieCard.appendChild(movieImg);
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

function disableScroll() {
  document.body.classList.add("disable-scroll");
}

function enableScroll() {
  document.body.classList.remove("disable-scroll");
}

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
