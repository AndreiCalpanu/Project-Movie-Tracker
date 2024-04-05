var nume = "Pirates of the Caribbean: The Curse of the Black Pearl"

function pushMovie(movieName) {
    fetch('https://www.omdbapi.com/?apikey=fced3ba8&t=' + movieName)

  .then(response => response.json())

  .then(function addMovie(json) {
    const movieName = json.Title
    const movieImg = json.Poster
    const moviePlot = json.Plot
    const movieRating = json.imdbRating
    const movieRelease = json.Released
    const movieDate = '2024-03-25'
    const addMovie = {
        name: movieName,
        description: moviePlot,
        image: movieImg,
        released: movieRelease,
        rating: movieRating,
        date: movieDate
    }
    const localStorageMovies = getMovies();
    localStorageMovies.push(addMovie);
    setMovies(localStorageMovies);
    
    renderMovieList(localStorageMovies);
}
)}


const movies = [
    {
        name: 'The Dark Knight',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
        released: '2008-07-18',
        rating: 9.0,
        date: '2023-12-20'
    },
    {
        name: 'Coco',
        description: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
        image: 'https://m.media-amazon.com/images/M/MV5BYjQ5NjM0Y2YtNjZkNC00ZDhkLWJjMWItN2QyNzFkMDE3ZjAxXkEyXkFqcGdeQXVyODIxMzk5NjA@._V1_SX300.jpg' ,
        released: "2017-11-22",
        rating: 8.4,
        date: '2023-12-15'
    },
    {
        name: 'John Wick',
        description: "An ex-hitman comes out of retirement to track down the gangsters who killed his dog and stole his car.",
        image: "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX300.jpg",
        released: "2014-10-24",
        rating: 7.4,
        date: '2019-10-18'
    }

]


function getMovies() {
    const localStorageMovies = localStorage.getItem("movies");
    const parsedLocalStorageMovies = JSON.parse(localStorageMovies);
    return parsedLocalStorageMovies;
}

function setMovies(movies) {
    const stringifiedMovies = JSON.stringify(movies);
    localStorage.setItem("movies", stringifiedMovies);
}

if (localStorage.getItem('movies') === null) {
    setMovies(movies);
}

window.addEventListener('load', function() {
    const localStorageMovies = getMovies();
    renderMovieList(localStorageMovies);
})

class Movie {
    constructor(image,name, description, released, rating, date) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.released = released;
        this.rating = rating;
        this.date = date;
    }
    
    renderMovie() {
        const ul = document.querySelector('#movie-list');
        ul.innerHTML += `
            <li class="column">
                <p><img src="${this.image}"/></p>
                <p><b>Title:</b> ${this.name}</p>
                <p><b>Description:</b> ${this.description}</p>
                <p><b>Release Date:</b> ${this.released}</p>
                <p><b>IMDb Rating:</b> ${this.rating}</p>
                <p><b>Date:</b> ${this.date}</p>
            </li>
        `
    }
}

function renderMovieList(movies) {
    const ul = document.querySelector('#movie-list');
    ul.innerHTML = '';

    movies.forEach( (movie) => {
        const film = new Movie(movie.image, movie.name, movie.description, movie.released, movie.rating, movie.date);
        film.renderMovie();
    }); 
}

function addFormFunctionality() {
    const form = document.querySelector('#add-movie');
    form.addEventListener('submit', function (eventDetails) {
        eventDetails.preventDefault();
        const movieName = eventDetails.target.name.value;
        const movieDescription = eventDetails.target.description.value;
        const movieImage = eventDetails.target.img.value;
        const movieReleased =eventDetails.target.year.value;
        const movieRating = Number(eventDetails.target.rating.value);
        const movieDate = eventDetails.target.date.value;
        const newMovie = {
            name: movieName,
            description: movieDescription,
            image: movieImage,
            released: movieReleased,
            rating: movieRating,
            date: movieDate
        };

        const localStorageMovies = getMovies();
        localStorageMovies.push(newMovie);
        setMovies(localStorageMovies);
        
        renderMovieList(localStorageMovies);
    })
    form.addEventListener('submit', function resetForm() {
        document.querySelector('#add-movie').reset();
    })
}

window.addEventListener('load', addFormFunctionality);

function viewMovies(viewType) {
    switch(viewType) {
        case 'VIEW_LIST':
            function viewListMovies() {
                document.getElementById("movie-list").style.flexDirection = "column";
            }
            
            localStorageMovies = getMovies();
            localStorageMovies.sort(viewListMovies);
            renderMovieList(localStorageMovies);
            setMovies(localStorageMovies);
            break;
            case 'VIEW_TABLE':
                function viewTableMovies() {
                    document.getElementById("movie-list").style.flexDirection = "row";
                }
                
                localStorageMovies = getMovies();
                localStorageMovies.sort(viewTableMovies);
                renderMovieList(localStorageMovies);
                setMovies(localStorageMovies);
            break;
        default:
    }
}

function addViewFunctionality() {
    const viewListButton = document.querySelector("#list");
    viewListButton.addEventListener('click', function(){
        viewMovies('VIEW_LIST');
    })

    const viewTableButton = document.querySelector("#table");
    viewTableButton.addEventListener('click', function() {
        viewMovies('VIEW_TABLE');
    })
}

window.addEventListener('load', addViewFunctionality);

function sortMovies(sortType) {
    switch(sortType) {
        case 'SORT_BY_NAME':
            function compareByName(movie1, movie2) {
                if (movie1.name < movie2.name) {
                    return -1;
                }
                if (movie1.name > movie2.name) {
                    return 1;
                }
                return 0;
            }
            
            localStorageMovies = getMovies();
            localStorageMovies.sort(compareByName);
            renderMovieList(localStorageMovies);
            setMovies(localStorageMovies);
            break;
        case 'SORT_BY_RELEASE':
            function compareByRelease(movie1, movie2) {
                if (movie1.released < movie2.released) {
                    return -1;
                }
                if (movie1.released > movie2.released) {
                    return 1;
                }
                return 0;
            }
            
            localStorageMovies = getMovies();
            localStorageMovies.sort(compareByRelease);
            renderMovieList(localStorageMovies);
            setMovies(localStorageMovies);
            break;
        case 'SORT_BY_RATING':
            function compareByRating(movie1, movie2) {
                if (movie1.rating > movie2.rating) {
                    return -1;
                }
                if (movie1.rating < movie2.rating) {
                    return 1;
                }
                return 0;    
            }

            localStorageMovies = getMovies();
            localStorageMovies.sort(compareByRating);
            renderMovieList(localStorageMovies);
            setMovies(localStorageMovies);
            break;

        case 'SORT_BY_DATE':
            function compareByDate(movie1, movie2) {
                if (movie1.date < movie2.date) {
                        return -1;
                }
                if (movie1.date > movie2.date) {
                        return 1;
                }
                    return 0;    
            }
    
            localStorageMovies = getMovies();
            localStorageMovies.sort(compareByDate);
            renderMovieList(localStorageMovies);
            setMovies(localStorageMovies);
            break;
    
        default:
    }
}

function addSortingFunctionality() {
    const sortByNameButton = document.querySelector("#sort-by-name");
    sortByNameButton.addEventListener('click', function(){
        sortMovies('SORT_BY_NAME');
    })

    const sortByReleaseButton = document.querySelector("#sort-by-release");
    sortByReleaseButton.addEventListener('click', function() {
        sortMovies('SORT_BY_RELEASE');
    })

    const sortByRatingButton = document.querySelector("#sort-by-rating");
    sortByRatingButton.addEventListener('click', function() {
        sortMovies('SORT_BY_RATING');
    })

    const sortByDateButton = document.querySelector("#sort-by-date");
    sortByDateButton.addEventListener('click', function() {
        sortMovies('SORT_BY_DATE');
    })

}

window.addEventListener('load', addSortingFunctionality);