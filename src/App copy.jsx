import './App.css';
import React, { Component } from 'react';
import bootstrap from 'bootstrap';
import { getMovies } from './services/fakeMovieService';

class App extends Component {
  state = {
    movie: getMovies(),
    movieNumber: 0,
  };

  renderMovieNumber = () => {
    this.state.movieNumber += this.state.movie.length;
    console.log(this.state.movieNumber);
  };

  renderMovieTitle = () => {
    const titleList = [];
    for (const iterator of this.state.movie) {
      titleList.push(iterator.title);
    }
    return titleList.map((title) => <tr>{title}</tr>);
  };

  renderMovieGenre = () => {
    const genreList = [];
    for (const iterator of this.state.movie) {
      genreList.push(iterator.genre.name);
    }
    return genreList.map((genre) => <tr>{genre}</tr>);
  };

  renderMovieRate = () => {
    const rateList = [];
    for (const iterator of this.state.movie) {
      rateList.push(iterator.dailyRentalRate);
    }
    return rateList.map((rate) => <tr>{rate}</tr>);
  };

  renderMovieProperty = (propertyName) => {
    const rateList = [];
    for (const iterator of this.state.movie) {
      rateList.push(iterator[propertyName]);
    }
    return rateList.map((rate) => <tr>{rate}</tr>);
  };

  renderMovieStock = () => {
    const stockList = [];
    for (const iterator of this.state.movie) {
      stockList.push(iterator.numberInStock);
    }
    return stockList.map((stock) => <tr>{stock}</tr>);
  };
  render() {
    return (
      <main>
        <table>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Rate</th>
            <th>Stock</th>
          </tr>
          <tr>
            {this.renderMovieProperty('title')}
            <td>{this.renderMovieProperty('genre.name')}</td>
            <td>{this.renderMovieProperty('dailyRentalRate')}</td>
            <td>{this.renderMovieProperty('numberInStock')}</td>
          </tr>
        </table>
      </main>
    );
  }
}

export default App;
