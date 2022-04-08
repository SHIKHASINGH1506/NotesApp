import { useState, createContext, useContext, useReducer, useEffect } from 'react';
import { notesReducer, initialNoteState } from 'reducer';
import { getNotes } from 'service';

const NoteContext = createContext();
const useNote = () => useContext(NoteContext);

const NoteProvider = ({ children }) => {
  const initialNote = {
    title: '',
    body: '',
    priority: ''
  };
  const [noteData, setNoteData] = useState(initialNote);
  const [editNoteData, setEditNoteData] = useState();
  const [archiveNoteData, setArchiveNoteData] = useState();
  const [state, dispatch] = useReducer(notesReducer, initialNoteState);

  const getAllNotes = () => {
    getNotes(dispatch);
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    token && getAllNotes();
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
      { children }
    </NoteContext.Provider>
  );
}

export {NoteProvider, useNote}