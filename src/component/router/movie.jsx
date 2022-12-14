import React from 'react';
import NewMovie from './newMovie';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const withRouter = () => (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const id = params._id;

  // etc... other react-router-dom v6 hooks

  return (
    <NewMovie
      {...props}
      params={params}
      id={id}
      navigate={navigate}
      location={location}
      user={props.user}
    />
  );
};

export default withRouter(NewMovie);
