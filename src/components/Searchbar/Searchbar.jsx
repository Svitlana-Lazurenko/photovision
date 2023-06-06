import React, { Component } from 'react';
import { CiSearch } from 'react-icons/ci';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleNameChange = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { searchName } = this.state;

    if (searchName.trim() === '') {
      alert('Enter the value.');
      return;
    }

    this.props.onSubmit(searchName);
    this.setState({ searchName: '' });
  };

  render() {
    const { searchName } = this.state;

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
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
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
