import './SearchBar.css';

function SearchBar({ searchTerm, onSearch }) {
  return (
    <form className="search-form" role="search" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="book-search">Search by title</label>
      <div className="search-input-wrap">
        <span aria-hidden="true">⌕</span>
        <input
          id="book-search"
          type="search"
          value={searchTerm}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Try ‘Tomorrow’"
        />
      </div>
    </form>
  );
}

export default SearchBar;
