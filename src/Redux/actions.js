import types from "./types";

export function setMovies(movies) {
    return ({
        type: types.setMovies,
        payload: {
            movies: movies
        }
    })

}


export function addToFavorites(id) {
    return ({
        type: types.addToFavorites,
        payload: {
           id: id
        }

    })
}

export function deleteFromFavorites(id) {
    return ({
        type:types.deleteFromFavorites, 
        payload: {
            id: id
        }
    })
}
