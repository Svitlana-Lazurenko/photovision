import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import imagesAPI from '../../services/image-api';
import css from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const ImageGallery = ({ newSearchName, openModal }) => {
  const [status, setStatus] = useState(Status.IDLE);
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(0);
  const [imagesArr, setImagesArr] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSearchName(newSearchName);
    setPage(1);
    setImagesArr([]);
  }, [newSearchName]);

  useEffect(() => {
    if (!searchName) {
      return;
    }

    setStatus(Status.PENDING);

    imagesAPI
      .fetchImages(searchName, page)
      .then(imagesObj => {
        if (imagesObj.hits.length === 0) {
          return Promise.reject(new Error(`${searchName} not found`));
        }

        setImagesArr([...imagesArr, ...imagesObj.hits]);
        setTotalHits(imagesObj.totalHits);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [page, searchName]);

  function handlePageIncrement() {
    setPage(page + 1);
  }

  if (status === 'idle') {
    return null;
  }

  if (status === 'pending') {
    return (
      <>
        <ul className={css.ImageGallery}>
          {imagesArr.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatImage={webformatURL}
              largeImage={largeImageURL}
              openModal={openModal}
              description={tags}
            />
          ))}
        </ul>
        <Loader />;
      </>
    );
  }

  if (status === 'rejected') {
    return <div className={css.ErrorMessage}>{error.message}</div>;
  }

  if (status === 'resolved') {
    return (
      <>
        <ul className={css.ImageGallery}>
          {imagesArr.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatImage={webformatURL}
              largeImage={largeImageURL}
              openModal={openModal}
              description={tags}
            />
          ))}
        </ul>
        {totalHits > imagesArr.length && (
          <Button onClick={handlePageIncrement} />
        )}
      </>
    );
  }
};

export default ImageGallery;

ImageGallery.propTypes = {
  newSearchName: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
