import './priority-box.css';

export const PriorityBox = ({priority, setFields}) => {
  const dropdownOption=[
    {
      id: 1,
      pId: 1,
      value: 'Low'
    },
    {
      id: 2,
      pId: 2,
      value: 'Medium'
    },
    {
      id: 3,
      pId:3,
      value: 'High'
    },
    {
      id: 0,
      pId:0,
      value: 'None'
    }
  ];
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