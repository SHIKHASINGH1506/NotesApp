import './label.css';
import { useState } from 'react';
import { LabelInput } from 'component';
import { useNote } from 'context';
import { v4 as uuid } from "uuid";
import { editNote, updateArchiveNote } from 'service';
import { useToast } from 'custom-hooks/useToast';
import { useEffect } from 'react';

const Label = ({id, noteData}) => {
  const {state: {labels, notes}, dispatch} = useNote();
  const [label, setLabelForExistingNote] = useState('');
  const {showToast} = useToast();

  //set label input field in label editor
  const setLableField = (e) => {
    e.stopPropagation();
    setLabelForExistingNote(e.target.value);
  }

  const isLabelInNote = (id) => noteData.tags.find(tag => tag.labelId===id) ? true : false;

  const [labelEditor, setLabelEditor] = useState(
    labels.map(label => ({
      ...label,
      isChecked: isLabelInNote(label.id)
    }))
  );

  useEffect(() => {
    setLabelEditor(
      labels.map(label => ({
        ...label,
        isChecked: isLabelInNote(label.id)
      }))
    );
  },
  [labels, noteData.tags]);

  const postUpdatedNotes = (updatedNote) => {
    if(noteData.isArchive){
      updateArchiveNote(dispatch, id, {archiveNote:updatedNote}, showToast)
    }
    else{
      editNote(dispatch, id, {note:updatedNote}, showToast);
    }
    showToast('Labels updated successfully', 'success');
  }

  const getEditedNote = (actionType, labelid, label) => {
    switch(actionType) {
      case 'REMOVE_LABEL':
        return {...noteData, tags: noteData.tags.filter(tag => tag.labelId !== labelid)};
      case 'ADD_LABEL':
        return {...noteData, tags:[...noteData.tags, { label: label, labelId: labelid}]};
    }
  }

  // function to add new label to note
  const labelInputHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const uid = uuid();
    const updatedNote = getEditedNote('ADD_LABEL', uid, label);
    postUpdatedNotes(updatedNote);

    dispatch({type: 'SET_LABEL', payload: { label: label, labelId: uid, isChecked: false} });
    setLabelForExistingNote('');
  }
  
  // function to add existing label to note
  const labelCheckboxHandler = (e, labelid, label) => {
    e.stopPropagation();

    setLabelEditor(currentLabels => 
      currentLabels.map(label => 
        label.id===labelid
         ? {...label, isChecked: !label.isChecked}
         : label
      )
    );

    const updatedNote = labelEditor.find(label => label.id === labelid).isChecked
      ? getEditedNote('REMOVE_LABEL', labelid, label)
      : getEditedNote('ADD_LABEL', labelid, label);

    postUpdatedNotes(updatedNote);
    // noteData.isArchive
    //   ? updateArchiveNote(dispatch, id, {archiveNote:updatedNote}, showToast)
    //   : editNote(dispatch, id, {note:updatedNote}, showToast);
    
  }
  return(
    <div className="label-card-wrapper d-flex flex-col"
      onClick={e => e.stopPropagation()}>
      <p>Label note</p>
      <LabelInput 
        label={label}
        addLabelHandler={labelInputHandler}
        setlabelField={setLableField}
      />
      {labelEditor.length > 0 &&
        <div className="label-card-list d-flex">
          {labelEditor.map( ({id, label, isChecked}) => (
            <label key={id} className="list-item" htmlFor={label}>
            <input
              className="mr-4"
              type="checkbox"
              id={label}
              name={label}
              checked={isChecked}
              onChange={(e) => labelCheckboxHandler(e, id, label)}
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