import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import css from './App.module.css';

class App extends Component {
  state = {
    searchName: '',
    showModal: false,
    largeImage: '',
    description: '',
  };

  handleFormSubmit = searchName => {
    this.setState({ searchName });
  };

  showModal = (url, description) => {
    this.setState({ showModal: true, largeImage: url, description });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImage: '', description: '' });
  };

  render() {
    const { searchName, showModal, description, largeImage } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchName={searchName} showModal={this.showModal} />
        {showModal && (
          <Modal
            largeImage={largeImage}
            description={description}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default App;
