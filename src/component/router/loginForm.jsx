import React from 'react';
import Joi from 'joi-browser';
import Form from './form';
import { login } from '../../services/authService';

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
    locationToMove: '',
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };

  componentDidMount() {
    try {
      this.setState({
        locationToMove: this.props.location.state.from.pathname,
      });
    } catch (error) {
      return null;
    }
  }

  doSubmit = async () => {
    try {
      await login(this.state.data.username, this.state.data.password);
      window.location = this.state.locationToMove || '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = errors;
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput('username', 'Username')}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderButton('Login')}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
