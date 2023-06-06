import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClick }) => (
  <button className={css.Button} type="button" onClick={onClick}>
    Load more
  </button>
);

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
