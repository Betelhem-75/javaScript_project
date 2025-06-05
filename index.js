const moviesListsEL = document.querySelector(" .movies__lists");
const searchDisplay = document.querySelector('.search_Name');
const sortDisplay = document.querySelector('.sort');
const searchInput = document.querySelector(" .search__wrapper");
const searchBar = document.getElementById("search");
const loader = document.querySelector(' .fa-spinne');

function showSkeleton(count = 10) {
  const newLocal = `<div class = "skeleton-card">
       <div class= "skeleton-poster"></div>
       <div class= "skeleton-title"></div>
       <div class= "skeleton-title"></div>
       <div class= "skeleton-title"></div>
       <div class= "skeleton-title"></div>
    </div>
  `;
  const skeletonHTML = Array.from({ length: count}).map(() =>
    newLocal).join('');
  moviesListsEL.innerHTML = skeletonHTML;
}

function searchTitle(event){
  renderMoviesSarch(event.target.value);
  searchDisplay.innerHTML = event.target.value;
  searchInput.addEventListener("click", () => {
    let currentValue = searchBar.value.toLowerCase();
    let movies = document.querySelectorAll("h2.movie__title");
    movies.forEach((movie) => {
      if (movie.textContent.toLowerCase().includes(currentValue)) {
        movie.parentNode.parentNode.style.display = "block";
      } else {
        movie.parentNode.parentNode.style.display= "none";
      }
    });
  });

}

let allMoves = [];
async function renderMovies(searchTerm) {
  showSkeleton();
  const movies =await fetch(`https://omdbapi.com/?s=${searchTerm}&apikey=1a73e81b`);
  const moviesData = await movies.json();
  allMoves = moviesData.Search;
  loader.style.display="none";
  moviesMain(allMoves);
   
}

async function renderMoviesSarch(searchTerm) {
  loader.style.display = "block";
  try{
    const movies =await fetch(`https://omdbapi.com/?s=${searchTerm}&apikey=1a73e81b`);
    const moviesData = await movies.json();
    allMoves = moviesData.Search;
    setTimeout(() => {
      loader.style.display="none";
      moviesMainSearch(allMoves);
    }, 1000);
  } catch (error){
    loader.textContent = `Failed to load Movie`;
    console.error("error Fetching movies:",error);
  }
}

function moviesMainSearch(movies) {
  moviesListsEL.innerHTML = movies
  .slice(0, 6)
  .map(
    (movie) =>{
      return `
      <div class="movies__list">
          <div class="movies__lists--container">
            <img src="${movie.Poster}" class="poster" alt="" />
            <h2 class="movie__title"> ${movie.Title} </h2>
            <p class="movie__type"><b>Year:</b> ${movie.Year}</p>
            <p class="movie__type"><b>imdbID:</b> ${movie.imdbID}</p>
            <p class="movie__type"><b>Type:</b> ${movie.Type}</p>
         </div>
      </div>` 
  })
 .join("");

}

function filterSort(event){
  const sortOption = event.target.value
  let sortedMovies = [...allMoves]

  if (sortOption === "NEW" ){
      sortedMovies.sort((a, b)=> b.Year - a.Year)
  } else if (sortOption === "OLD"){
    sortedMovies.sort((a, b)=> a.Year - b.Year)
  }
  moviesMainSearch(sortedMovies);
}

function moviesMain(movies) {
  moviesListsEL.innerHTML = movies
  .map(
    (movie) =>{
      return `
      <div class="movies__list">
          <div class="movies__lists--container">
            <img src="${movie.Poster}" class="poster" alt="" />
            <h2 class="movie__title"> ${movie.Title} </h2>
            <p class="movie__type"><b>Year:</b> ${movie.Year}</p>
            <p class="movie__type"><b>imdbID:</b> ${movie.imdbID}</p>
            <p class="movie__type"><b>Type:</b> ${movie.Type}</p>
         </div>
      </div>` 
  })
 .join("");
}

renderMovies();





/*

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


async function displayMovies() {
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
  
  

} 

moviesmain();

*/
