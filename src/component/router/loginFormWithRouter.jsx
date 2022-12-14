import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import LoginForm from './loginForm';

const withRouterLoginForm = () => (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const id = params._id;

  // etc... other react-router-dom v6 hooks

  return (
    <LoginForm
      {...props}
      params={params}
      id={id}
      navigate={navigate}
      location={location}
    />
  );
};

export default withRouterLoginForm(LoginForm);
