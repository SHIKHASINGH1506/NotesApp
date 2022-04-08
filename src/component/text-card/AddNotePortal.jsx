import ReactDOM from "react-dom";
import { NoteForm } from "./NoteForm";
import { addNote } from 'service';
import { useNote } from 'context';
import { getFormattedDate } from 'utils/getFormatedDate';
import { useToast } from 'custom-hooks/useToast';

export const AddNotePortal = () => {
  const {
    noteData,
    setNoteData,
    state: { 
      addFormFocus,
      editFormFocus 
    },
    dispatch } = useNote();
  const initialNote = {
    title: '',
    body: ''
  };

  const { showToast } = useToast();
  const setNoteFields = (e) => {
    const { name, value } = e.target;
    setNoteData({
      ...noteData,
      [name]: value
    });
  }
  const addNoteHandler = (e, color) => {
    e.preventDefault();
    e.stopPropagation();
    if (!(noteData.title.trim() === '' && noteData.body.trim() === '')) {
      addNote(
        dispatch,
        {
          note: {
            ...noteData,
            isArchive: false,
            isPinned: false,
            bgColor: color,
            createdOn: getFormattedDate()
          }
        },
        showToast);
      setTimeout(() => {
        setNoteData(initialNote);
        dispatch({
          type: 'SET_NEW_NOTE_FOCUS',
          payload: {
            editFormFocus: false,
            addFormFocus: false
          }
        });
      }, 1000)
    }
    setNoteData(initialNote);
    dispatch({
      type: 'SET_NEW_NOTE_FOCUS',
      payload: {
        editFormFocus: false,
        addFormFocus: false
      }
    });
  }

  return ReactDOM.createPortal(
    <NoteForm
      isForm={addFormFocus}
      noteData={noteData}
      setFields={setNoteFields}
      addNoteHandler={addNoteHandler}
      isAddFrom={true}
    />,
    document.getElementById("addPortal")
  );
};