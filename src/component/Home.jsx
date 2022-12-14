import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/MovieService';
import { Link } from 'react-router-dom';
import Like from './Like';
import Pagination from './Pagination';
import { paginate } from '../utils/paganate';
import ListGroup from './listGroup';
import { getGenres } from '../services/GenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Home extends Component {
  state = {
    movies: [],
    genres: [],
    movieNumber: getMovies().length,
    sortOrderStock: 1,
    seeingFavorites: false,
    pageSize: 6,
    currentPage: 1,
    searchValue: '',
    sortColumn: { path: 'title', order: 'asc' },
  };

  async componentDidMount() {
    const movieData = await getMovies();
    const genraData = await getGenres();
    const genres = [{ name: 'All Movies', _id: '' }, ...genraData];
    this.setState({
      movies: movieData,
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
          {this.props.user && (
            <button
              onClick={() => this.deleteMovie(movie._id)}
              className='btn btn-danger'
            >
              Delete
            </button>
          )}
        </td>
      </tr>
    );
  }

  deleteMovie = async (movieID) => {
    let myMovies = this.state.movies;
    let origianMovies = await getMovies();

    const myMovie = myMovies.find((movie) => movie._id === movieID);
    myMovies.splice(myMovies.indexOf(myMovie), 1);
    this.setState({ movies: myMovies });
    this.setMovieNumber();
    try {
      await deleteMovie(movieID);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error('This movie has already been deleted');
      if (error.response.status === 401)
        toast.error('You must be logged in to delete');

      this.setState({ movies: origianMovies });
    }
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleChenage = (e) => {
    let searchValue = e.currentTarget.value;
    this.setState({ searchValue, selectedGenre: null, currentPage: 1 });
  };

  renderTableRows = () => {
    const {
      currentPage,
      pageSize,
      selectedGenre,
      movies: AllMovies,
      sortColumn,
      searchValue,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? AllMovies.filter((m) => m.genre._id === selectedGenre._id)
        : AllMovies;

    const handleSearch = () => {
      let searchedMovie = [];
      for (const iterator of AllMovies) {
        if (iterator.title.toLowerCase().includes(searchValue.toLowerCase())) {
          searchedMovie.push(iterator);
        }
      }
      return searchedMovie;
    };
    let searchedMovie = handleSearch();
    if (searchValue) {
      const sorted = _.orderBy(
        searchedMovie,
        [sortColumn.path],
        [sortColumn.order]
      );
      const movies = paginate(sorted, currentPage, pageSize);

      const result = movies.map((movie) => this.renderTableRow(movie));

      return result;
    } else {
      const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

      const movies = paginate(sorted, currentPage, pageSize);

      const result = movies.map((movie) => this.renderTableRow(movie));

      return result;
    }
  };

  render() {
    const { user } = this.props;

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
      <div className='container'>
        <ToastContainer />
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
            {user && (
              <Link to='/movies/new'>
                <button className='btn btn-primary'>New Movie</button>
              </Link>
            )}
            <p> There are {filtered.length} movies on the list</p>
            <input
              value={this.state.searchValue}
              className='form-control'
              placeholder='Search'
              onChange={this.handleChenage}
            />
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
