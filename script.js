const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const movieContainer = document.getElementById('movie-container');

const apiKey = 'your_omdb_api_key';  // Replace with your OMDb API key

// Function to fetch movie data
async function fetchMovies(query) {
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'True') {
            displayMovies(data.Search);
        } else {
            movieContainer.innerHTML = `<p>No movies found. Please try again.</p>`;
        }
    } catch (error) {
        movieContainer.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    }
}

// Function to display movies
function displayMovies(movies) {
    movieContainer.innerHTML = ''; // Clear any previous results
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
        `;

        movieContainer.appendChild(movieCard);
    });
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMovies(query);
    } else {
        movieContainer.innerHTML = `<p>Please enter a movie name.</p>`;
    }
});

// Optional: Add Enter key functionality for search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});
