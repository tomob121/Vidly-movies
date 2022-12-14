import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './component/router/NavBar';
import Home from './component/Home';
import Customers from './component/router/customers';
import Rentals from './component/router/rentals';
import NotFound from './component/router/notFound';
import RegisterForm from './component/router/registerForm';
import WithRouter from './component/router/movie';
import WithRouterLoginForm from './component/router/loginFormWithRouter';
import Logout from './component/router/logut';
import { getCurrentUser } from './services/authService';


class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  componentDidUpdate(prevProps, prevState) {
    
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <NavBar user={this.state.user} />
        <Routes>
          <Route path={'/movies/:_id'} element={<WithRouter user={user} />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/rentals' element={<Rentals />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<WithRouterLoginForm />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/movies' element={<Home user={user} />} />
          <Route path='/' element={<Home user={user} />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    );
  }
}

export default App;
