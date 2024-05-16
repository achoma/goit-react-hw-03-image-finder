import css from './Button.module.css';
import PropTypes from 'prop-types';

// import { Container } from 'components/Container/Container';

export const Button = ({ onClick, children }) => {
  return (
    <>
      <button className={css.button} type="button" onClick={onClick}>
        {children}
      </button>
    </>
  );
};
//--------------- to dopisałam -----------------------
Button.propTypes = {
  loadMore: PropTypes.func,
};
// -------- to było ------------
// Button.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   children: PropTypes.string.isRequired,
// };
