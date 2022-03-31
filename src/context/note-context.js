import { useState, createContext, useContext, useReducer } from 'react';
import {notesReducer, initialNoteState} from 'reducer';

const NoteContext = createContext();
const useNote = () => useContext(NoteContext);

const NoteProvider = ({ children }) => {
  const initialNote = {
    title: '',
    body: ''
  };
  const [buttonFocus, setButtonFocus] = useState(false);
  const [noteData, setNoteData] = useState(initialNote);
  const [state, dispatch] = useReducer(notesReducer, initialNoteState);
  return (
    <NoteContext.Provider value={{buttonFocus, setButtonFocus, noteData, setNoteData, state, dispatch}}>
      { children }
    </NoteContext.Provider>
  );
}

export {NoteProvider, useNote}