// API Configuration with fallbacks
const API_CONFIG = {
    omdb: {
        url: "https://www.omdbapi.com/",
        key: "5f98b89d", // This is a test key - replace with your own
        params: (query, year) => {
            let params = `s=${encodeURIComponent(query)}`;
            if (year) params += `&y=${year}`;
            return params;
        },
        transform: (data) => {
            if (data.Response === "False") throw new Error(data.Error || "No results found");
            return data.Search.map(movie => ({
                ...movie,
                source: 'OMDb',
                Poster: movie.Poster !== "N/A" ? movie.Poster : null
            }));
        }
    },
    themoviedb: {
        url: "https://api.themoviedb.org/3/search/",
        key: "8a9121949f5a9ddaf7e272d9a4e5b6b0", // Public test key
        params: (query, year) => {
            let params = `movie?api_key=${this.key}&query=${encodeURIComponent(query)}`;
            if (year) params += `&year=${year}`;
            return params;
        },
        transform: (data) => {
            if (!data.results || data.results.length === 0) throw new Error("No results found");
            return data.results.map(movie => ({
                Title: movie.title,
                Year: movie.release_date ? movie.release_date.substring(0, 4) : 'N/A',
                Poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
                Type: 'movie',
                imdbID: movie.id,
                source: 'TMDb'
            }));
        }
    },
    tvmaze: {
        url: "https://api.tvmaze.com/search/",
        params: (query) => `shows?q=${encodeURIComponent(query)}`,
        transform: (data) => {
            if (!data || data.length === 0) throw new Error("No results found");
            return data.map(item => ({
                Title: item.show.name,
                Year: item.show.premiered ? item.show.premiered.substring(0, 4) : 'N/A',
                Poster: item.show.image?.medium || null,
                Type: 'series',
                imdbID: item.show.id,
                source: 'TVMaze'
            }));
        }
    }
};

// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("results");
const yearFilter = document.getElementById("yearFilter");

// Initialize
function init() {
    populateYearDropdown();
    
    // Event Listeners
    searchBtn.addEventListener("click", handleSearch);
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSearch();
    });
    yearFilter.addEventListener("change", handleSearch);
}

// Populate year dropdown (last 30 years)
function populateYearDropdown() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 30; year--) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    }
}

// Handle search with API fallback
async function handleSearch() {
    const query = searchInput.value.trim();
    const year = yearFilter.value;

    if (!query) {
        showMessage("Please enter a search term");
        return;
    }

    showLoading();

    try {
        // Try APIs in order of preference
        const apisToTry = ['omdb', 'themoviedb', 'tvmaze'];
        let movies = [];
        
        for (const apiName of apisToTry) {
            try {
                const result = await searchWithAPI(apiName, query, year);
                if (result && result.length > 0) {
                    movies = result;
                    break;
                }
            } catch (error) {
                console.log(`${apiName} API failed:`, error.message);
                continue;
            }
        }

        if (movies.length === 0) {
            showMessage("No movies found. Try a different search term.");
        } else {
            displayMovies(movies);
        }
    } catch (error) {
        showError(error);
    }
}

// Search using a specific API
async function searchWithAPI(apiName, query, year = "") {
    const api = API_CONFIG[apiName];
    if (!api) throw new Error("Invalid API configuration");

    const url = `${api.url}${api.params(query, year)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return api.transform(data);
}

// Display movies
function displayMovies(movies) {
    const placeholderImage = "https://via.placeholder.com/300x450?text=No+Poster";
    
    const movieCards = movies.map(movie => `
        <div class="movie-card">
            <img src="${movie.Poster || placeholderImage}" alt="${movie.Title}" 
                 onerror="this.src='${placeholderImage}'">
            <div class="movie-info">
                <h3>${movie.Title} <span>(${movie.Year})</span></h3>
                <p class="type">${movie.Type.toUpperCase()}</p>
                <p class="source">Source: ${movie.source}</p>
            </div>
        </div>
    `).join("");

    resultsContainer.innerHTML = `
        <div class="results-header">
            <h2>Search Results (${movies.length})</h2>
        </div>
        <div class="movie-grid">${movieCards}</div>
    `;
}

// Show loading state
function showLoading() {
    resultsContainer.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Searching for movies...</p>
        </div>
    `;
}

// Show error message
function showError(error) {
    resultsContainer.innerHTML = `
        <div class="error-message">
            <h3>Error</h3>
            <p>${error.message || "An unknown error occurred"}</p>
            <button onclick="handleSearch()">Try Again</button>
        </div>
    `;
}

// Show generic message
function showMessage(message) {
    resultsContainer.innerHTML = `
        <div class="info-message">
            <p>${message}</p>
        </div>
    `;
}

// Initialize the app
document.addEventListener("DOMContentLoaded", init);