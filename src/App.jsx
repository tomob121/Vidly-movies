import React, { Component } from 'react';
import NavBar from './component/router/NavBar';
import Home from './component/Home';
import Customers from './component/router/customers';
import Rentals from './component/router/rentals';
import NotFound from './component/router/notFound';
import MovieId from './component/movieId';
import { Routes, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Routes>
          <Route path={`/component/home/:_id`} element={<MovieId />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/rentals' element={<Rentals />} />
          <Route path='/component/home' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    );
  }
}

export default App;
