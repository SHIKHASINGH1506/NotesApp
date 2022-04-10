import { useState, createContext, useContext, useReducer, useEffect } from 'react';
import { notesReducer, initialNoteState } from 'reducer';
import { getNotes, getNotesFromTrash, getAllArchiveNotes } from 'service';

const NoteContext = createContext();
const useNote = () => useContext(NoteContext);

const NoteProvider = ({ children }) => {
  const initialNote = {
    title: '',
    body: '',
    priority: 'None'
  };
  const [noteData, setNoteData] = useState(initialNote);
  const [editNoteData, setEditNoteData] = useState();
  const [archiveNoteData, setArchiveNoteData] = useState();
  const [state, dispatch] = useReducer(notesReducer, initialNoteState);

  const getAllNotes = () => {
    getNotes(dispatch);
  }
  const getArchiveNotes = async () => {
    try {
      const { data: { archives } } = await getAllArchiveNotes();
      dispatch({type: 'INIT_ARCHIVES_SUCCESS', 
        payload: {
          archives,
          loading: false,
          error: null,
          addFormFocus: false,
          editFormFocus: false,
      }});
    } catch (error) {
      dispatch({type: 'INIT_NOTES_ERROR', 
        payload: {
          archives,
          loading: false,
          error: "Error while fetching archive notes",
          addFormFocus: false,
          editFormFocus: false,
      }});
      console.log(error.response.data);
    }
  }

  const getAlltrashedNotes = async () => {
    try {
      const { data :{trash} } = await getNotesFromTrash();
        dispatch({
          type: 'INIT_TRASH_SUCCESS', 
          payload: {
            trash,
            loading: false,
            error: null,
            addFormFocus: false,
            editFormFocus: false
          }});
    } catch (error) {
      dispatch({
        type: 'INIT_NOTES_ERROR',
        payload: {
          loading: false,
          error: 'Error loading notes in trash',
          addFormFocus: false,
          editFormFocus: false
        }
      })
    }
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    token && getAllNotes();
  }, []);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    token && getArchiveNotes();
  }, []);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    token && getAlltrashedNotes();
  }, []);
  return (
    <NoteContext.Provider value={{
      noteData,
      setNoteData,
      editNoteData,
      setEditNoteData,
      archiveNoteData,
      setArchiveNoteData,
      state,
      dispatch
    }}>
      {children}
    </NoteContext.Provider>
  );
}

export { NoteProvider, useNote }