console.log(`Opdracht: Filmzoeker. David Sneek: `)

let getMovieUrl = (imdbID) => {
    let movieUrl = `https://www.imdb.com/title/${imdbID}/`;
    return movieUrl;
}

console.log(`step 4: `)
const addMoviesToDom = movies => {
    const movieList = document.querySelector("#movieList")
    movieList.innerHTML = ""
    const noMoviesToShow = document.querySelector(".no-movies-to-show")
    noMoviesToShow.innerHTML = ""

    for (let movie of movies) {
        const  movieListInHtml = `<li class="movieListInHtml"><a class="movie__html" href="${getMovieUrl(movie?.imdbID)}" target="_blank"><img class = "grid-container__movie__link" src = ${movie?.Poster} ></img></a></li>`
        movieList.insertAdjacentHTML('beforeend', movieListInHtml);
    }
    if (movies.length === 0) {
        const movieListInHtml2 = `<div class="no-movies-to-show">"Deze zoekterm levert geen resultaten op in de film database. Probeert u een andere zoekterm."</div>`
        noMoviesToShow.insertAdjacentHTML('beforeend', movieListInHtml2);
    }
}

const filterMovies = (wordInMovieTitle) => {
    let filterMovieTitle = movies       
        .filter(movie =>     
            movie.Title.toLowerCase().includes(wordInMovieTitle?.toLowerCase()))
    filterMovieTitle = filterMovieTitle ?? [];
    return filterMovieTitle;
}

const filterOneMovie = (imdbID) => {
    let filterMovieTitle = movies       
        .filter(movie => movie.imdbID === imdbID)
    return filterMovieTitle;
}

let savedMovieSearchTerm;


const inputFieldSearchTerm = document.querySelector('.flex-container__inputfield-search-term');

inputFieldSearchTerm.addEventListener('change', function () {
    // preserve  search-term-value (e.g. "de") from input field, so this search-term can be re-used after e.g. clicking on button 'Toon willekeurige film' or clicking on  a radiobutton.
    savedMovieSearchTerm = this.value;
    this.value = this.value ?? savedMovieSearchTerm;
    addMoviesToDom(filterMovies(savedMovieSearchTerm))
});


const inputSearchButton = document.querySelector('.flex-container__search-button');
inputSearchButton.addEventListener('click', function () {
    this.value = this.value ?? savedMovieSearchTerm;
    addMoviesToDom(filterMovies(savedMovieSearchTerm))
});

document.addEventListener('keydown', function (event) {
    if (inputFieldSearchTerm === document.activeElement) {
        if (event.key === "Enter") {
            addMoviesToDom(filterMovies(savedMovieSearchTerm))
        }   
    }
})

let buttonSearchRandom = document.querySelector('.flex-container__random-search-button');
buttonSearchRandom.addEventListener('click', function(){ addMoviesToDom(filterOneMovie(getMovieImdbIdRandom()))});


const filterLatestMovies  = () => {
let latestMovies = movies
    .filter(movie => parseInt(movie.Year) >= 2014)
    console.log(filterLatestMovies) 
    console.log(latestMovies) 
return latestMovies;
}

addMoviesToDom(filterLatestMovies())

const handleOnChangeEvent = event => {
    let radioButtonSelected = event.target.value;
    let selectedMovies;
    console.log(event.target.value)

    switch (radioButtonSelected) {
        case 'latestFilms':
            selectedMovies = filterLatestMovies()
            break;
        case 'avengerFilms':
            selectedMovies = filterMovies("Avenger")
            break;
        case 'x-menFilms':
            selectedMovies = filterMovies("X-Men")
            break;
        case 'princessFilms':
            selectedMovies = filterMovies("Princess")
            break;
        case 'batmanFilms':
            selectedMovies = filterMovies("Batman")
            break;
        default:
            console.log(` The selected radiobutton < ${radioButtonSelected} > is not a valid choice.`);
}
    addMoviesToDom(selectedMovies)
}

let radios = document.querySelectorAll('input[type=radio][name="film-filter"]');
radios.forEach(radio => radio.addEventListener('change', handleOnChangeEvent));

const getRandomIntFromInterval = () => Math.floor(Math.random() * movies.length);

let getMovieImdbIdRandom = () => {
    const randomNumber = getRandomIntFromInterval()
    let randomMovieImdbId = movies[randomNumber]?.imdbID
    return randomMovieImdbId;
}
 