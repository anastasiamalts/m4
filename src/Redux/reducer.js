import types from "./types"

const initialState = {
    movies: [],
    favorites: [],
    listID: [], 
    showEmptyErr: false 
}

export default function reducer(state = initialState, action) {
    if (action.type === types.setMovies) {
        console.log('+', action.payload)
        let updatedState = {
            ...state,
            movies: action.payload.movies, 
            showEmptyErr: true
        }
        return updatedState
    }
    if (action.type === types.addToFavorites) {
        let favoriteMovie = state.movies.find(item => item.imdbID === action.payload.id)
        let doubledMovie = state.favorites.find(item => item.imdbID === favoriteMovie.imdbID)
        if (doubledMovie) {
            return state
        }
        else {
        let updatedState = {
            ...state, 
            favorites: [
                ...state.favorites, 
                favoriteMovie
            ]
        }
        return updatedState
    }
        
    }
    if (action.type === types.deleteFromFavorites) {
        let filteredMoviesList = state.favorites.filter(item => item.imdbID !== action.payload.id)
        let updatedState = {
            ...state, 
            favorites: 
                // ...state.favorites, 
                filteredMoviesList

        }
        console.log('----', updatedState, action.payload.id)
        return updatedState
    }
    // if (action.type = types.postMoviesList) {

    // }
    return state
}