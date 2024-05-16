import css from './ImageGalleryItems.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = props => {
  const { webformatURL, largeImageURL, tags, onClick } = props;

  const handleImageClick = () => {
    onClick({ webformatURL, largeImageURL, tags });
  };

  return (
    <li className={css.gallery__item} data-url={largeImageURL}>
      <img
        className={css.gallery__image}
        src={webformatURL}
        alt={tags}
        loading="lazy"
        onClick={handleImageClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
