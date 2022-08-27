import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';
import '../SearchBox/SearchBox'
import { connect } from 'react-redux'


class Movies extends Component {

    render() {
        return (
            <ul className="movies">
                {console.log('-',this.props)}
                {this.props.showEmptyErr && !this.props.movies.length ? <div>Movie not found</div>  : '' }
                {this.props.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} />
                    </li>
                ))}
            </ul>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        movies: state.movies, 
        showEmptyErr: state.showEmptyErr
    }
}

export default connect(mapStateToProps)(Movies)

// export default Movies;