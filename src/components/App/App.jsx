import { useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import css from './App.module.css';

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [description, setDescription] = useState('');

  function handleFormSubmit(searchName) {
    setSearchName(searchName);
  }

  function openModal(url, description) {
    setShowModal(true);
    setLargeImage(url);
    setDescription(description);
  }

  function closeModal() {
    setShowModal(false);
    setLargeImage('');
    setDescription('');
  }

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery newSearchName={searchName} openModal={openModal} />
      {showModal && (
        <Modal
          largeImage={largeImage}
          description={description}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;
