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
    body: '',
    priority: 'None'
  };

  const { showToast } = useToast();
  const setNoteFields = (e) => {
    const { name, value } = e.target;
    setNoteData({
      ...noteData,
      [name]: value
    });
  }
  const addNoteHandler = async (e, color) => {
    e.preventDefault();
    e.stopPropagation();
    if (!(noteData.title.trim() === '' && noteData.body.trim() === '')) {
      try {
        const note = {
          ...noteData,
          isArchive: false,
          isPinned: false,
          bgColor: color,
          createdOn: getFormattedDate()
        }
        const { data: { notes } } = await addNote({ note: note });
        dispatch({
          type: 'UPDATE_NOTE',
          payload: { notes }
        });
      showToast('Note added!', 'success');
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
      catch (error) {
        showToast('Note not added!', 'error');
        console.log(error.response.data);
      }
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