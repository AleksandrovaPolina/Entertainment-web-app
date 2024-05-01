fetch('./data.json')
  .then(res => res.json())
  .then(data => {
    createDOMStructure(data.filter(movie => !movie.isTrending));
  })
  .catch(error => {
    console.error('Ошибка загрузки или обработки JSON:', error);
  });

function createDOMStructure(data) {
    
    data.forEach(movie => {
    const container = document.querySelector('.container');

    const movieElement = document.createElement('div');
    movieElement.classList.add('movieCard');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movieCover');
    movieImg.src = movie.thumbnail && movie.thumbnail.regular && movie.thumbnail.regular.medium; // Обратите внимание на изменение пути к изображению
    movieImg.alt = movie.title;

    const infoElement = document.createElement('div');
    infoElement.classList.add('movieInfo');

    const yearElement = document.createElement('p');
    yearElement.classList.add('movieYear');
    yearElement.textContent = movie.year;

    const categoryElement = document.createElement('p');
    categoryElement.classList.add('movieCategory');
    categoryElement.textContent = movie.category;

    const ratingElement = document.createElement('p');
    ratingElement.classList.add('movieRating');
    ratingElement.textContent = movie.rating;

    const titleElement = document.createElement('h3');
    titleElement.classList.add('movieTitle');
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
