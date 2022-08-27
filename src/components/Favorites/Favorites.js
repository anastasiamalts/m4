import React, { Component } from 'react';
import './Favorites.css';
import { connect } from 'react-redux';
import { deleteFromFavorites } from '../../Redux/actions';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom'
// const params = useParams()


class Favorites extends Component {
    state = {
        title: '',
        id: ''
    }
    handleChange = (event) => {
        this.setState({ title: event.target.value })
    }
    postListHandler = () => {
        const movieInfo = {
            title: this.state.title,
            movies: this.props.favoriteMovies.map(item => item.imdbID)
        }
        fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(movieInfo)
        })
        .then((result) => result.json())
        .then((data) => {
            console.log('--', data)
            this.setState({id: data.id})
        })

    }
    
    render() {
        return (
            <div className="favorites">
                <input
                    value={this.state.title}
                    className="favorites__name"
                    placeholder='Новый список'
                    onChange={this.handleChange}
                />
                <ul className="favorites__list">
                    {this.props.favoriteMovies.map((item) => {
                        return <li key={item.imdbID}>{item.Title} ({item.Year})
                            <button onClick={() => this.props.remove(item.imdbID)}>X</button>
                        </li>;
                    })}
                </ul>
                    {this.state.id
                    ? <Link to ={'/list/' + this.state.id} >Перейти к списку</Link>
                    :
                    <button type="button"
                    className="favorites__save"
                    disabled={!this.state.title}
                    onClick ={this.postListHandler}
                >
                    Сохранить список
                </button>
                    }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        favoriteMovies: state.favorites
    }
}
const mapDispatchToProps = dispatch => ({
    remove: (id) => dispatch(deleteFromFavorites(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(Favorites)

