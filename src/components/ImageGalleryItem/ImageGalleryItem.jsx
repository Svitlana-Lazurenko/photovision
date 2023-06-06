import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  showModal,
  webformatImage,
  largeImage,
  description,
}) => (
  <li className={css.ImageGalleryItem}>
    <button
      className={css.imageItemButton}
      type="button"
      onClick={() => {
        showModal(largeImage, description);
      }}
    >
      <img
        className={css.ImageGalleryItem_image}
        src={webformatImage}
        alt={description}
      />
    </button>
  </li>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatImage: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
