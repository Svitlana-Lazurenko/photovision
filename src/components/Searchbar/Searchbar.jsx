import { useState } from 'react';
import PropTypes from 'prop-types';
import { CiSearch } from 'react-icons/ci';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  function handleNameChange(event) {
    setSearchName(event.currentTarget.value.toLowerCase());
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (searchName.trim() === '') {
      alert('Enter the value.');
      return;
    }

    onSubmit(searchName);
    setSearchName('');
  }

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <CiSearch className={css.SearchForm_button_icon} />
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
