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
  });
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
