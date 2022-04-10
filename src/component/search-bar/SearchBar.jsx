import './search-bar.css';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useNote, useSortFilter } from 'context';
import { useState } from 'react';
import { FilterModalPortal } from 'component';

export const SearchBar = ({ handleFilterFocus, notesType }) => {
  const { state: { notes, archives, labels } } = useNote();
  const notesList = notesType === 'notes' ? notes : archives;
  const { searchHandler, searchText } = useSortFilter();

  const [filterFocus, setFilterFocus] = useState(false);
  const filterFocusHandler = (e, type) => {
    e.stopPropagation();
    if (type === 'SHOW') {
      setFilterFocus(true);
    }
    else
      setFilterFocus(false);
  }

  return (
    <div className="search-bar d-flex items-center">
      <button className="search-bar__btn" type="submit">
        <i className="fas fa-search"></i>
      </button>
      <input
        className="search-bar-input"
        type="text"
        id="product"
        value={searchText}
        onChange={(e) => searchHandler(e)}
        placeholder="Search item here"
      />
      {/* {notesList.length > 0 && <button className="search-bar__btn" onClick={(e) => handleFilterFocus(e)}>
        <FilterAltOutlinedIcon className="icon" /> */}
      {notesList.length > 0 &&
        <button className="search-bar__btn" onClick={(e) => filterFocusHandler(e, 'SHOW')}>
          <FilterAltOutlinedIcon className="icon" />
        </button>
      }

      <div className={`overlay ${filterFocus ? 'visible' : ''}`}>
        <div className={`modal-wrapper ${filterFocus ? 'show' : ''}`}>
          {filterFocus && <FilterModalPortal filterFocusHandler={filterFocusHandler} />}
        </div>
      </div>
    </div>
  );
}