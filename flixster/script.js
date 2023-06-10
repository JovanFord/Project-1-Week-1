// Set the base URL for the movie poster images
const imageURL = "https://image.tmdb.org/t/p/w342";

// Initialize the page number
let page = 1;

// Get the movie card and movie section elements
const movieCard = document.querySelector(".movie-card");
const movieSection = document.querySelector(".movie-section");

// Get the load more button element and attach an event listener to it
const loadMoreBtn = document.getElementById("fixed-button");
loadMoreBtn.addEventListener("click", addMovies);

//
const searchForm = document.getElementById("search-bar")
const searchInput = document.getElementById("search-input")
searchForm.addEventListener("submit", searchMovieAPI)

// Fetch data from the API
async function getAPI() {
    // Send a GET request to the API with the current page number
    const options = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=c9a75e5001247c1344b43838cf3171be&page=${page}`, {
        headers: {
            accept: 'application/json',
            Authorization: 'c9a75e5001247c1344b43838cf3171be'
        }
    });

    // Parse the response as JSON
    const movieData = await options.json();
    const results = await movieData.results;
    console.log(results);

    // Display the movies on the page
    displayMovies(results);
}

// Call the API function to fetch and display the initial page of movies
getAPI();

// Display movies on the page
function displayMovies(results) {
    let movieCard = document.createElement("div");
    for (let i = 0; i < results.length; i++) {
        const movieSection = document.querySelector(".movie-section");
        movieCard.innerHTML += `
            <div class="movie-card"> 
                <img class="movie-poster" src="${imageURL}${results[i].poster_path}" />
                <p class="movie-title">${results[i].title}</p>
                <p class="movie-rating">Rating: ${results[i].vote_average}★</p>
            </div>
        `;
    }
    movieSection.appendChild(movieCard);
}

// Load more movies
function addMovies(results) {
    // Increment the page number
    page++;
    console.log(page);

    // Call the API function to fetch and display the next page of movies
    getAPI();
}

let clearSearchBtn = document.getElementById('clear-search-btn')
clearSearchBtn.addEventListener("click", () =>{
    event.preventDefault()
    clearSearchBtn.style.visibility = "hidden"
    searchInput.value = ""
    page = 1
    movieSection.innerHTML = ""
    getAPI();
})

//Search for a specific movie or group of movies
async function searchMovieAPI(){
    // Send a GET request to the API with the current page number
    const options = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInput.value}&include_adult=false&language=en-US&page=${page}`, {
        headers: {
            accept: 'application/json',
            Authorization: 'c9a75e5001247c1344b43838cf3171be'
        }
    });

    // Parse the response as JSON
    const movieData = await options.json();
    const results = await movieData.results;
    console.log(results);

    // Display the movies on the page
    displayMovies(results);

}
searchInput.addEventListener('keyup', () => {
    movieSection.innerHTML = ""
    if (searchInput.value.length > 0){
        clearSearchBtn.style.visibility = "visible"
        searchMovieAPI()
    }
    else{
        clearSearchBtn.style.visibility = "hidden";
        page = 1
        getAPI()
    }
})


// const openPopup = document.getElementById("movie-card")
// const popup = document.getElementById()

// openPopup.addEventListener('click', function() {
//     openPopup.style.display = "block";
// });
