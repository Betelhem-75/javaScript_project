const moviesListsEL = document.querySelector(' .movies__lists');

async function searchChange(event) {
  const Title = event.target.value
  const movies = await fetch(`https://omdbapi.com/?s=fast&apikey=1a73e81bTitle=$(Title)`);
  const moviesData = await movies.json();
  moviesListsEL.innerHTML = moviesData.Search.slice(0, 5)
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

async function moviesMain() {
  const movies = await fetch(`https://omdbapi.com/?s=fast&apikey=1a73e81b`);
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