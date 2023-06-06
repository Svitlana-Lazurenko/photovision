import React from 'react';
import { Circles } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => (
  <div className={css.Loader}>
    <Circles
      height="80"
      width="80"
      color="#fc00ff"
      ariaLabel="circles-loading"
      visible={true}
    />
  </div>
);

export default Loader;
