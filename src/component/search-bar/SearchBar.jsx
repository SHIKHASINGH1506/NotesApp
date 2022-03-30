import './search-bar.css';

export const SearchBar = () => {
  return (
    <div className="search-bar d-flex items-center">
      <button className="search-bar__btn" type="submit">
        <i className="fas fa-search"></i>
      </button>
      <input
        className="search-bar-input"
        type="text"
        id="product"
        placeholder="Search item here"
      />
    </div>
  );
}