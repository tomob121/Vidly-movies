import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovie } from '../services/fakeMovieService';

const MovieId = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1 className=' m-4'>Movie Form {_id}</h1>
      <button className='btn btn-primary m-2' onClick={() => navigate(-1)}>
        Save
      </button>
    </div>
  );
};

export default MovieId;
