const buttonSearchRandom = document.querySelector('.flex-container__random-search-button');
const inputFieldSearchTerm = document.querySelector('.flex-container__inputfield-search-term');
const inputSearchButton = document.querySelector('.flex-container__search-button');
const radios = document.querySelectorAll('input[type=radio][name="film-filter"]');
let savedMovieSearchTerm;


const getMovieUrl = imdbID => `https://www.imdb.com/title/${imdbID}/`;

const addMoviesToDom = movies => {
    const movieList = document.querySelector("#movieList")
    movieList.innerHTML = "";
    const noMoviesToShow = document.querySelector(".no-movies-to-show");
    noMoviesToShow.innerHTML = "";

    for (const movie of movies) {
        const movieListInHtml = `<li class="movieListInHtml"><a class="movie__html" href="${getMovieUrl(movie?.imdbID)}" target="_blank"><img class = "grid-container__movie__link" src = ${movie?.Poster} ></img></a></li>`;
        movieList.insertAdjacentHTML('beforeend', movieListInHtml);
    }
    if (movies.length === 0) {
        const movieListInHtml2 = `<div class="no-movies-to-show">"Deze zoekterm levert geen resultaten op in de film database. Probeert u een andere zoekterm."</div>`;
        noMoviesToShow.insertAdjacentHTML('beforeend', movieListInHtml2);
    }
}

addMoviesToDom(movies);

const filterMovies = wordInMovieTitle => {
    let filterMovieTitle = movies
        .filter(movie =>
            movie.Title.toLowerCase().includes(wordInMovieTitle?.toLowerCase()));
    filterMovieTitle = filterMovieTitle ?? [];
    addMoviesToDom(filterMovieTitle);
}

const filterLatestMovies  = () => {
    const latestMovies = movies
        .filter(movie => parseInt(movie.Year) >= 2014);
    addMoviesToDom(latestMovies);
}

const filterOneMovie = imdbID => {
    const filterMovieTitle = movies
        .filter(movie => movie.imdbID === imdbID);
    addMoviesToDom(filterMovieTitle);
}

const getRandomIntFromInterval = () => Math.floor(Math.random() * movies.length);

const getMovieImdbIdRandom = () => {
    const randomNumber = getRandomIntFromInterval();
    let randomMovieImdbId = movies[randomNumber]?.imdbID;
    return randomMovieImdbId;
}


inputFieldSearchTerm.addEventListener('change', function (event) {
    // preserve  search-term-value (e.g. "de") from input field, so this search-term can be re-used after e.g. clicking on button 'Toon willekeurige film' or clicking on  a radiobutton.
    savedMovieSearchTerm = event.target.value;
    event.target.value = event.target.value ?? savedMovieSearchTerm;
    return filterMovies(savedMovieSearchTerm);
});

inputSearchButton.addEventListener('click', function (event) {
    event.target.value = event.target.value ?? savedMovieSearchTerm;
    return filterMovies(savedMovieSearchTerm);
});

document.addEventListener('keydown', function (event) {
    if (inputFieldSearchTerm === document.activeElement) {
        if (event.key === "Enter") {
            filterMovies(savedMovieSearchTerm);
        }   
    }
})

buttonSearchRandom.addEventListener('click', function(){ filterOneMovie(getMovieImdbIdRandom())});

const handleOnChangeEvent = event => {
    const radioButtonSelected = event.target.value;
    switch (radioButtonSelected) {
        case 'allFilms':
            addMoviesToDom(movies);
            break;        
        case 'latestFilms':
            filterLatestMovies();
            break;
        case 'avengerFilms':
            filterMovies("Avenger");
            break;
        case 'x-menFilms':
            filterMovies("X-Men");
            break;
        case 'princessFilms':
            filterMovies("Princess");
            break;
        case 'batmanFilms':
            filterMovies("Batman");
            break;
        default:
            console.log(` The selected radiobutton < ${radioButtonSelected} > is not a valid choice.`);
    }
}

radios.forEach(radio => radio.addEventListener('change', handleOnChangeEvent));



 