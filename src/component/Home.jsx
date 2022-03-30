import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { Link } from 'react-router-dom';
import Like from './Like';
import Pagination from './Pagination';
import { paginate } from '../utils/paganate';
import ListGroup from './listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Home extends Component {
  state = {
    movies: [],
    genres: [],
    movieNumber: getMovies().length,
    sortOrderStock: 1,
    seeingFavorites: false,
    pageSize: 6,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' },
  };

  componentDidMount() {
    const genres = [{ name: 'All Movies', _id: '' }, ...getGenres()];

    this.setState({
      movies: getMovies(),
      genres,
      movies2: getMovies(),
    });
  }

  setMovieNumber = () => {
    this.setState({ movieNumber: this.state.movies.length });
  };

  renderMovieGenre = () => {
    const genreList = [];
    for (const iterator of this.state.movies) {
      genreList.push(iterator.genre.name);
    }
    return genreList.map((genre) => <tr>{genre}</tr>);
  };

  renderMovieProperty = (propertyName) => {
    const rateList = [];
    for (const iterator of this.state.movies) {
      rateList.push(iterator[propertyName]);
    }
    return rateList.map((rate) => <tr>{rate}</tr>);
  };

  handleLiked = (movie) => {
    const movies = this.state.movies;
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleFavorits = () => {
    const likedMovies = [];
    const movies = this.state.movies;
    const allMovies = this.state.movies2;
    this.setState({ currentPage: 1 });
    if (!this.state.seeingFavorites) {
      for (const movie of movies) {
        if (movie.liked) {
          likedMovies.push(movie);
        }
      }
      this.setState({ seeingFavorites: true });
      this.setState({ movies: likedMovies });
    } else {
      this.setState({ seeingFavorites: false });
      this.setState({ movies: allMovies });
    }
  };

  renderTableRow(movie) {
    return (
      <tr key={movie._id}>
        <td>
          <Link style={{ textDecoration: 'none' }} to={`${movie._id}`}>
            {movie.title}
          </Link>
        </td>
        <td>{movie.genre.name}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>{movie.numberInStock}</td>
        <td>
          <Like liked={movie.liked} onClick={() => this.handleLiked(movie)} />
        </td>
        <td>
          <button
            onClick={() => this.deleteMovie(movie._id)}
            className='btn btn-danger'
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }

  deleteMovie = (movieID) => {
    let myMovies = this.state.movies;
    const myMovie = myMovies.find((movie) => movie._id === movieID);
    myMovies.splice(myMovies.indexOf(myMovie), 1);
    this.setState({ movies: myMovies });
    this.setMovieNumber();
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  renderTableRows = () => {
    const {
      currentPage,
      pageSize,
      selectedGenre,
      movies: AllMovies,
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? AllMovies.filter((m) => m.genre._id === selectedGenre._id)
        : AllMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    const result = movies.map((movie) => this.renderTableRow(movie));

    return result;
  };

  render() {
    const {
      currentPage,
      pageSize,
      selectedGenre,
      movies: AllMovies,
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? AllMovies.filter((m) => m.genre._id === selectedGenre._id)
        : AllMovies;

    return (
      <div>
        <main className='row m-5'>
          <div className='col-2'>
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className='col'>
            <link
              rel='stylesheet'
              href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css'
            ></link>
            <p> There are {filtered.length} movies on the list</p>
            <MoviesTable
              onFavorit={this.handleFavorits}
              onRender={this.renderTableRows}
              sortColumn={sortColumn}
              seeingFavorites={this.state.seeingFavorites}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default Home;
