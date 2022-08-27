import React, { Component } from 'react';
import './MovieItem.css';
import { connect } from 'react-redux'
import { addToFavorites } from '../../Redux/actions';

class MovieItem extends Component {
    render() {

        const { Title, Year, Poster } = this.props;
        console.log(this.props)
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    {
                        this.props.favorites.find(item => item.imdbID === this.props.imdbID)
                            ? <button className="movie-item__add-button" disabled>Добавлено</button>
                            : <button
                                type="button"
                                className="movie-item__add-button"
                                onClick={() => this.props.add(this.props.imdbID)}>
                                Добавить в список
                            </button>
                    }


                </div>
            </article>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        favorites: state.favorites

    }
}

const mapDispatchToProps = dispatch => ({
    add: (id) => dispatch(addToFavorites(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(MovieItem)
// export default MovieItem;