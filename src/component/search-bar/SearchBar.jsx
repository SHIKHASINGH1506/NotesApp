import './search-bar.css';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {useNote} from 'context';

export const SearchBar = ({handleFilterFocus}) => {
  const {state: {notes}} = useNote();
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
      {notes.length > 0 && <button className="search-bar__btn" onClick={() => handleFilterFocus()}>
        <FilterAltOutlinedIcon className="icon" />
      </button>}
    </div>
  );
}