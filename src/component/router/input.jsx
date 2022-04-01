import React from 'react';
const Input = ({ name, label, value, onChange }) => {
  return (
    <div className='form-group mb-3 col-5'>
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        autoFocus
        name={name}
        ref={this.username}
        id={name}
        type='text'
        className='form-control'
      />
    </div>
  );
};

export default Input;
