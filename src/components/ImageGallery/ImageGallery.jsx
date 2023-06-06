import React, { Component } from 'react';
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

class ImageGallery extends Component {
  state = {
    status: Status.IDLE,
    searchName: '',
    page: 0,
    imagesArr: [],
    error: null,
    totalHits: 0,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.searchName !== prevState.searchName) {
      return { page: 1, searchName: nextProps.searchName, imagesArr: [] };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { imagesArr, searchName, page } = this.state;
    const prevName = prevProps.searchName;
    const prevPage = prevState.page;

    if (prevPage !== page || prevName !== searchName) {
      this.setState({ status: Status.PENDING });

      imagesAPI
        .fetchImages(searchName, page)
        .then(imagesObj => {
          if (imagesObj.hits.length === 0) {
            return Promise.reject(new Error(`${searchName} not found`));
          }
          this.setState({
            imagesArr: [...imagesArr, ...imagesObj.hits],
            totalHits: imagesObj.totalHits,
            status: Status.RESOLVED,
          });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  handlePageIncrement = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { imagesArr, error, status, page, totalHits } = this.state;
    const { searchName, showModal } = this.props;

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
                showModal={showModal}
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
                showModal={showModal}
                description={tags}
              />
            ))}
          </ul>
          {totalHits > imagesArr.length && (
            <Button
              page={page}
              searchName={searchName}
              onClick={this.handlePageIncrement}
            />
          )}
        </>
      );
    }
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};
