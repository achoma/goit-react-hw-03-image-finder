import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { SearchForm } from 'components/SearchForm/SearchForm';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = query => {
    onSubmit(query);
  };

  return (
    <header className={css.searchbar}>
      <SearchForm onSubmit={handleSubmit} />
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
