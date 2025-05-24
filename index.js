const moviesListsEL = document.querySelector(" .movies__lists");
const searchInput = document.querySelector(" .search__wrapper");
const searchBar = document.getElementById("search")
const filterSort = document.querySelector(" .sort");

searchInput.addEventListener('click', () => {
  let currentValue = searchBar.value.toLowerCase();
  console.log(currentValue);
  let movies = document.querySelectorAll('h2.movie__title');
  movies.forEach(movie => {
    if (movie.textContent.toLowerCase().includes(currentValue)){
      movie.parentNode.parentNode.style.display = 'block';
    }
    else{
      movie.parentNode.parentNode.style.display = 'none';
    }
  });
})


async function moviesmain() {
  const movies = await fetch("https://omdbapi.com/?s=fast&apikey=1a73e81b")
  const moviesData = await movies.json();
  const sortOptions = document.querySelector(' .sort');
  moviesListsEL.innerHTML = moviesData.Search.sort((a, b) => {
    function filter(event) {
      const selected = event.target.value;
    
      const movieContainer = document.querySelector(' .movies__lists--container');
      let moviecard = Array.from(document.querySelectorAll('h4.movie__type'));
      
      const sortedMovies = moviecard.sort((a, b) => {
        const YearA = parseInt(a.getAttribute('data-year'));
        const YearB = parseInt(b.getAttribute('data-year'));
    
        if (selected ==='NEW_TO_OLD'){
          return YearB - YearA;
        } else if  (selected ==='OLD_TO_NEW'){
          return YearA - YearB;
        } else {
          return "";
        }
      });
    };  
  })
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
 .join("");
  

} 

moviesmain();


