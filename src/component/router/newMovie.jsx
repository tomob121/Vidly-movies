import React from 'react';
import Form from './form';
import Joi from 'joi-browser';
import { saveMovie, getMovie } from '../../services/MovieService';
import { getGenres } from '../../services/GenreService';
import { redirect } from 'react-router-dom';

class NewMovie extends Form {
  state = {
    data: {
      title: '',
      genre: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {},
  };

  async populateGenre() {
    const genreData = await getGenres();
    const genres = [{ name: '', _id: '' }, ...genreData];
    this.setState({ genres });
  }

  async populateMovie() {
    const movieId = this.props.id;
    if (movieId === 'new') return;

    try {
      const movie = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) redirect('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateGenre();
    await this.populateMovie();

    if (!this.props.user) {
      setTimeout(() => {
        this.props.navigate('/login', { state: { from: this.props.location } });
      });
    }
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genre: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genre: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().required().label('Number in stock').min(0),
    dailyRentalRate: Joi.number().required().label('Rate').min(0).max(10),
  };

  doSubmit = async () => {
    try {
      const movie = { ...this.state.data };
      await saveMovie(movie);
    } catch (ex) {}

    this.props.navigate('/movies');
  };

  handleDropDown = () => {
    return (
      <div className='dropdown-show'>
        <a
          className='btn btn-secondary dropdown-toggle'
          role='button'
          id='dropdownMenuLink'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'
        >
          Dropdown link
        </a>

        <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
          <a className='dropdown-item'>Action</a>
          <a className='dropdown-item'>Another action</a>
          <a className='dropdown-item'>Something else here</a>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className='container'>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genre', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number In Stock')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default NewMovie;
