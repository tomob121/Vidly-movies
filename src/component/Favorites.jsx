import React from 'react';

const Favorites = (props) => {
  const { seeingFavorites, onClick } = props;
  let classes = 'btn ';
  classes += seeingFavorites ? 'btn-secondary' : 'btn-primary';
  return (
    <button className={classes} onClick={onClick}>
      {seeingFavorites ? 'All' : 'Favorites'}
    </button>
  );
};

export default Favorites;
