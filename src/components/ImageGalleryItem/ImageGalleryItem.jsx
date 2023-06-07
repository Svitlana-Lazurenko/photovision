import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  openModal,
  webformatImage,
  largeImage,
  description,
}) => (
  <li className={css.ImageGalleryItem}>
    <button
      className={css.imageItemButton}
      type="button"
      onClick={() => {
        openModal(largeImage, description);
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
  openModal: PropTypes.func.isRequired,
  webformatImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
