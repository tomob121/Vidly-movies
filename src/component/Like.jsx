import React, { Component } from 'react';

class Like extends Component {
  render() {
    let classes = 'bi bi-heart-fill';
    if (!this.props.liked) classes = 'bi bi-heart';
    return (
      <i
        onClick={this.props.onClick}
        style={{ cursor: 'pointer' }}
        className={classes}
      ></i>
    );
  }
}

export default Like;
