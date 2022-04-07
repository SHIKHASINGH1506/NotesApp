import './filter-modal.css';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuid } from "uuid";
import {useSortFilter, useNote} from 'context';

export const FilterModal = ({filterFocusHandler}) => {
  const {sortFilterState:{sortBy, filterBylabels}, sortFilterDispatch } = useSortFilter();
  const {state:{labels}} = useNote();
  const sortOptions = [
    {
      id: uuid(),
      value: 'select option'
    },
    {
      id: uuid(),
      value: 'date created: latest'
    },
    {
      id: uuid(),
      value: 'date created: earliest'
    }
  ]
  const filterByLabelsHandler = labelId => {
    const newFilterByLabels = filterBylabels.map(
      filter => filter.id === labelId 
        ? { ...filter, filtered: !filter.filtered } 
        : filter
      );

    sortFilterDispatch({
      type: "FILTER_BY_LABELS", 
      payload: { filterBylabels: newFilterByLabels }
    });
}
  return(
    <div className="filter-sort-wrapper py-2 px-4">
      <div className="card__title-wrapper d-flex items-center justify-between">
        <h6>Sort & Filter</h6>
        <CloseIcon className="icon" onClick={(e) => filterFocusHandler(e, 'HIDE')}/>
      </div>
      <div className="sort-option-wrapper">
        <div className="sort-wrapper d-flex flex-col">
          <label htmlFor="sort">Sort by: </label>
          <select
            name="sort"
            id="sort"
           // className
              value={sortBy}
              onChange={(e) => sortFilterDispatch({
                type:'SORT_BY',
                payload:{ sortBy: e.target.value}
              })}
          >
            {sortOptions.map( (option, index) => {
           return index===0
              ? (
                <option value="" disabled selected>
                 {option.value}
                </option>
                )
              : (<option key={option.id} value={option.value}>{option.value}</option>)
              })}
          </select>
        </div>
        {labels.length>0 && <div className="filter-wrapper d-flex flex-col">
          <p>Filter by: </p>
          <div className="label-card-list d-flex">
            {labels.map(({id, label}) => (
              <label key={id} htmlFor={label} className="list-item">
                <input
                  className="mr-4"
                  type="checkbox"
                  id={label}
                  name={label}
                  checked={filterBylabels.find(filter => filter.id === id).filtered}
                  onChange={ () => filterByLabelsHandler(id)}
                />
                {label}
              </label>
              ))}
          </div>
        </div>}
        <div className="d-flex clear-filter-btn my-2">
          <button className="bttn bttn-primary bttn-sm" 
            onClick={() => sortFilterDispatch({
              type:'CLEAR_FILTER',
              payload: {
                sortBy: '',
                filterBylabels: filterBylabels.map(
                  label=> ({...label, filtered: false})
                )
              }
            })}
          >
              Clear
          </button>
        </div>
      </div>
    </div>
  )
}
