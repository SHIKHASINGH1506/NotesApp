import './filter-modal.css';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuid } from "uuid";
import {useNote} from 'context';

export const FilterModal = ({handleFilterFocus}) => {
  const {state: {labels}} = useNote();
  console.log(labels);
  const sortOptions = [
    {
      id: uuid(),
      value: 'date created: latest'
    },
    {
      id: uuid(),
      value: 'date created: earliest'
    }
  ]
  useEffect(() => {}, [labels])
  return(
    <div className="filter-sort-wrapper py-2 px-4">
      <div className="card__title-wrapper d-flex items-center justify-between">
        <h6>Sort & Filter</h6>
        <CloseIcon className="icon" onClick={() => handleFilterFocus()}/>
      </div>
      <div className="sort-option-wrapper">
        <div className="sort-wrapper d-flex flex-col">
          <label htmlFor="sort">Sort by: </label>
          <select
            name="sort"
            id="sort"
           // className
            onChange={(e) => console.log(e.target.value)}
          >
            {sortOptions.map(({id, value}) => (
              <option key={id} value={value}>{value}</option>
            ))}
          </select>
        </div>
        {labels.length>0 && <div className="filter-wrapper d-flex flex-col">
          <p>Filter by: </p>
          <div className="label-card-list d-flex">
          {labels.map(({id, label, isChecked}) => (
            <label key={id} htmlFor={label} className="lisrt-item">
              <input
                className="mr-4"
                type="checkbox"
                id={label}
                name={label}
                checked={isChecked}
                onChange={e=> console.log(e.target.checked)}
              />
              {label}
            </label>
          ))}
          </div>
        </div>}
      </div>
    </div>
  )
}
