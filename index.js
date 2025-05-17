const moviesListsEL = document.querySelector(' .movies__lists');

async function searchChange(event) {
  const Title = event.target.value
  const movies = await fetch(`https://omdbapi.com?apikey=1a73e81b&s=${Title}`);
  moviesListsEL.innerHTML = moviesData.Search
  .map(
    (movie) => 
      `<div class="movies__list">
          <div class="movies__lists--container">
            <img src="${movies.Poster}" class="poster" alt="" />
            <h2 class="movie__title"> ${movies.Title} </h2>
            <p class="movie__type"><b>Year:</b> ${movies.Year}</p>
            <p class="movie__type"><b>imdbID:</b> ${movies.imdbID}</p>
            <p class="movie__type"><b>Type:</b> ${movies.Type}</p>
           
         </div>
     </div>` 
  )
  .join("") 
}

async function moviesMain() {
  const movies = await fetch(`https://omdbapi.com?apikey=1a73e81b&s=${Title}`);
  const moviesData = await movies.json();
  console.log(moviesData);
  moviesListsEL.innerHTML = moviesData.Search
  .map(
    (movie) => 
      `<div class="movies__list">
          <div class="movies__lists--container">
            <img src="${movie.Poster}" class="poster" alt="" />
            <h2 class="movie__title"> ${movie.Title} </h2>
            <p class="movie__type"><b>Year:</b> ${movie.Year}</p>
            <p class="movie__type"><b>imdbID:</b> ${movie.imdbID}</p>
            <p class="movie__type"><b>Type:</b> ${movie.Type}</p>
           
         </div>
     </div>` 
)
  .join("") 
  
}

moviesMain();