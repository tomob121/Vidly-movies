import React from 'react';
const Input = ({ name, label, value, error, onChange, type }) => {
  return (
    <div className='form-group mb-3 col-5'>
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        autoFocus
        name={name}
        id={name}
        type={type}
        className='form-control'
      />
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default Input;
