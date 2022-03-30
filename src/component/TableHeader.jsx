import React, { Component } from 'react';
import Favorites from './Favorites';

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc')
      return <i className='bi bi-sort-alpha-down'></i>;
    return <i className='bi bi-sort-alpha-up'></i>;
  };

  render() {
    const { seeingFavorites, onFavorit } = this.props;

    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className='clickable'
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
          <th>
            <Favorites
              onClick={() => onFavorit()}
              seeingFavorites={seeingFavorites}
            />
          </th>
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
