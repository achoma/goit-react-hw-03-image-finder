import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ largeImageURL, tags, onClick }) => {
  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <img
          className={css.image}
          src={largeImageURL}
          alt={tags}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
