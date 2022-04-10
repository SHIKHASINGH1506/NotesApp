import './filter-modal.css';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuid } from "uuid";
import {useSortFilter, useNote} from 'context';
import {PriorityBox} from 'component';

export const FilterModal = ({filterFocusHandler}) => {
  const {
    sortFilterState:{
      sortBy, 
      filterBylabels,
      sortByPriority
    }, 
    sortFilterDispatch 
  } = useSortFilter();
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
  const dropdownOption=[
    {
      id: 1,
      value: 'High to Low'
    },
    {
      id: 2,
      value: 'Low to High'
    }
  ];
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
  const setPriorityHandler = e => {
    sortFilterDispatch({
      type: "SORT_BY_PRIORITY", 
      payload: { sortByPriority: e.target.value }
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
          <div className="label-card-list d-flex w-full">
            <label htmlFor="sort">Sort by: </label>
            <select
              name="sort"
              id="sort"
              className="p-2 w-full"
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
              <label key={id} htmlFor={label} className="d-flex justify-between items-center">
                <input
                  className="mr-2"
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
        {/* <p>Sort By Priority</p> */}
        <div className="label-card-list d-flex w-full">
          <label htmlFor="sort">Sort by Priority: </label>
            <select 
            className="p-2 w-full"
            name="priority" 
            id=""
            value={sortByPriority}
            onChange={e => setPriorityHandler(e)}>
            {dropdownOption.map(option => (
              <option
                key={option.id}
                value={option.value}
                >
                {option.value}
              </option>
            ))}
            </select>
        </div>
        <div className="d-flex clear-filter-btn my-2">
          <button className="bttn bttn-primary bttn-sm" 
            onClick={() => sortFilterDispatch({
              type:'CLEAR_FILTER',
              payload: {
                sortBy: '',
                sortByPriority: '',
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
    </div>
  )
}
