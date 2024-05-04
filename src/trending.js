export function createTrendingMoviesSection(data) {
  const trendingMoviesContainer = document.querySelector(
    ".trendingMoviesContainer"
  );

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
    infoElement.innerHTML = `<p>${movie.title}</p>
        <p>${movie.year}</p>
        <p>${movie.category}</p>
        <p>${movie.rating}</p>`;

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
