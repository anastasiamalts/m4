import React, { Component } from 'react';
import './SearchBox.css';
import {connect} from 'react-redux'
import {setMovies} from '../../Redux/actions';

class SearchBox extends Component {
    state = {
        searchLine: ''
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        
    }
    searchMovieHandler = () => {
        this.getMovie()
    }
    getMovie = () => {
        fetch(`http://www.omdbapi.com/?s=${this.state.searchLine}&apikey=ed3e284b`)
        .then((result) => result.json())
        .then((data) => {
            console.log('+++', data)
            data.Search ? this.props.setMovies(data.Search) : this.props.setMovies([])
        
        })

    }

    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                        onClick={this.searchMovieHandler}

                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    setMovies: (movies) => dispatch(setMovies(movies))
})
export default connect(null, mapDispatchToProps)(SearchBox)
