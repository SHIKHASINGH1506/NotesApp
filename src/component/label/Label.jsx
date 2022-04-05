import './label.css';
import { useState } from 'react';
import { LabelInput } from 'component';
import { useNote } from 'context';
import { v4 as uuid } from "uuid";

const Label = ({id}) => {
  const {state: {labels, notes}, dispatch} = useNote();
  const [label, setLabelForExistingNote] = useState('');

  //set label input field in label editor
  const setLableField = (e) => {
    e.stopPropagation();
    setLabelForExistingNote(e.target.value);
  }

  // function to add new label to note
  const labelInputHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedNotes = notes.map(
      note => note._id===id 
        ? {...note, tags:[...note.tags, { label: label, labelId: uuid()}]} 
        : note
      );
    dispatch({
      type:'UPDATE_NOTE',
      payload: {
        notes: updatedNotes
      }
    });
    dispatch({type: 'SET_LABEL', payload: { label: label, labelId: uuid(), isChecked: false} });
    setLabelForExistingNote('');
  }
  
  const labelCheckboxHandler = (e, labelid, label) => {
    e.stopPropagation();
    const updatedNotes = notes.map(
      note => note._id===id 
        ? {...note, tags:[...note.tags, { label: label, labelId: labelid}]} 
        : note
      );
    dispatch({
      type:'UPDATE_NOTE',
      payload: {
        notes: updatedNotes
      }
    });
  }

  return(
    <div className="label-card-wrapper d-flex flex-col">
      <p>Label note</p>
      <LabelInput 
        label={label}
        addLabelHandler={labelInputHandler}
        setlabelField={setLableField}
      />
      {labels.length > 0 &&
        <div className="label-card-list d-flex flex-col">
          {labels.map( ({id, label, isChecked}) => (
            <label key={id} className="list-item" htmlFor={label}>
            <input
              className="mr-4"
              type="checkbox"
              id={label}
              name={label}
              checked={isChecked}
              onClick={(e) => labelCheckboxHandler(e, id, label)}
            />
            {label}
          </label>
          ))}
        </div>
      }
    </div>
  )  
}
export {Label}