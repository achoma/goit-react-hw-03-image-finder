import { Component, createRef } from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItems/ImageGalleryItems';
import { getImages } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';

export class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.listRef = createRef();
  }

  state = {
    images: [],
    page: 1,
    totalPages: 0,
    isLoading: false,
    selectedImage: null,
    isModalOpen: false,
    scrollPosition: 0,
  };

  getSnapshotBeforeUpdate() {
    const list = this.listRef.current;
    const newScrollPosition = list.scrollHeight - list.scrollTop;
    return newScrollPosition;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { page, images } = this.state;

    const query = this.props.searchQuery;

    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.setState({ images: [], page: 1 }, () => {
        this.fetchImages(query, 1);
      });
    }
    if (this.state.page !== prevState.page) {
      this.loadMoreImages(query, page);

      this.setState({
        scrollPosition: snapshot,
      });
    }
    if (images !== prevState.images && images.length !== 0) {
      window.scrollTo({
        top: this.state.scrollPosition,
        behavior: 'smooth',
      });
    }
  }

  async fetchImages(query, page) {
    this.setState({ isLoading: true, scrollPosition: 0 });
    try {
      const response = await getImages(query, page);
      const data = response.data.hits;
      const totalPages = Math.floor(response.data.total / 12);
      this.setState({
        images: data,
        page: 1,
        totalPages: totalPages,
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async loadMoreImages(query, page) {
    this.setState({ isLoading: true });

    try {
      const response = await getImages(query, page);
      const data = response.data.hits;
      this.setState(prevState => ({
        images: [...prevState.images, ...data],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = image => {
    this.setState({ selectedImage: image, isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ selectedImage: null, isModalOpen: false });
  };

  render() {
    const { images, page, totalPages, isLoading, selectedImage } = this.state;

    return (
      <div>
        <ul className={css.gallery} ref={this.listRef}>
          {images.map(({ id, ...rest }) => (
            <ImageGalleryItem
              key={id}
              {...rest}
              onClick={this.openModal}
            ></ImageGalleryItem>
          ))}
        </ul>

        {isLoading && <Loader />}

        {page < totalPages && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}

        {selectedImage && (
          <Modal
            largeImageURL={this.state.selectedImage.largeImageURL}
            tags={this.state.selectedImage.tags}
            onClick={this.closeModal}
          />
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
