import React, { Component } from 'react';
import TableHeader from './TableHeader';

class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    { key: 'like' },
    { key: 'delete' },
  ];

  render() {
    const { onFavorit, onRender, seeingFavorites, sortColumn, onSort } =
      this.props;

    return (
      <table className='table table-border table-hover'>
        <TableHeader
          onFavorit={onFavorit}
          seeingFavorites={seeingFavorites}
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <tbody>{onRender()}</tbody>
      </table>
    );
  }
}

export default MoviesTable;
