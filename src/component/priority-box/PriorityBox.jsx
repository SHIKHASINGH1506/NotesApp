import './priority-box.css';
import { useState } from 'react';
import {useNote} from 'context';

export const PriorityBox = ({priority, setFields}) => {
  const dropdownOption=[
    {
      id: 1,
      value: 'low'
    },
    {
      id: 2,
      value: 'medium'
    },
    {
      id: 3,
      value: 'high'
    }
  ];
  console.log(priority);
  const {dispatch, state: {notes, archives}} = useNote();
  const [priorityOption, setPriority] = useState({});
  return(
  <div className="dropdown-content" onClick={e=> e.stopPropagation()}>
    <select 
      className="dropdown-item p-2"
      name="priority" 
      id=""
      value={priority}
      onChange={e => setFields(e)}>
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
  )
}