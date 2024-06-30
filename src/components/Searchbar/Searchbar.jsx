import css from './Searchbar.module.css';
// import { FaSearch } from 'react-icons/fa';
import { IoSearchCircleSharp } from 'react-icons/io5';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <IoSearchCircleSharp size={40} color="#5046e5" />
          {/* <FaSearch /> */}
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
      </form>
    </header>
  );
};
