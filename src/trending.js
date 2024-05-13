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
    document.getElementById("error").textContent =
      "Error trending movies: " + error;
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

    // modal;
    // const playButton = document.createElement("button");
    // playButton.classList.add("playButton");
    // playButton.textContent = "More info";

    // movieCard.addEventListener("mouseenter", () => {
    //   playButton.style.display = "block";
    // });

    // movieCard.addEventListener("mouseleave", () => {
    //   playButton.style.display = "none";
    // });
    // modal;
    movieCard.addEventListener("click", () =>
      openModalTrending(movie.kinopoiskId)
    );
    movieCard.appendChild(movieImg);
    movieCard.appendChild(infoElement);
    trendingMoviesContainer.appendChild(movieCard);
    // movieCard.appendChild(playButton);
  });
}

// modal
modalEl = document.querySelector(".modal");

async function openModalTrending(kinopoiskId) {
  const api_url_modal = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
  const id = kinopoiskId;

  const resp = await fetch(api_url_modal + id, {
    headers: {
      "X-API-KEY": "475b780a-eb7a-4f03-ab2c-288319493865",
      "Content-Type": "application/json",
    },
  });

  const respData = await resp.json();
  modalEl.classList.add("modal--show");

  modalEl.innerHTML = `
  <div class = "modal__card">
  <img class="modal__movie-backdrop" src="${respData.posterUrl}"  alt="${
    respData.nameOriginal
  }">
  <h2>
  <span class="modal__movie-title">Название - ${respData.nameOriginal} </span>
  <span class="modal__movie-releaese-year">Год - ${respData.year} </span>
  </h2>
  <ul class="modal__movie-info">
  <div class="loader"></div>
  <li class="modal__movie-genre">Жанр - ${respData.genres.map(
    (el) => `<p>${el.genre}</p>`
  )}</li>
  <li class="modal__movie-runtime">Время - ${respData.filmLength} минут</li>
  <li> Сайт: <a class="modal__movie-site" href="${respData.webUrl}">${
    respData.webUrl
  }</a></li>
  <li class="modal__movie-overview">Описaние - ${respData.description}</li>
  </ul>
  <button type="button" class="modal__button-close">Закрыть</button>
  </div>`;

  const btnClose = document.querySelector(".modal__button-close");
  btnClose.addEventListener("click", () => closeModalTrending());
}

function closeModalTrending() {
  modalEl.classList.remove("modal--show");
}

window.addEventListener("click", (evt) => {
  if (evt.target === modalEl) {
    closeModalTrending();
  }
});

window.addEventListener("keydown", (evt) => {
  if (evt.keyCode === 27) {
    modalEl.classList.remove("modal--show");
  }
});

// modal

// Horizontal scroll

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
