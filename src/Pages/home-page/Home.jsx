import './home.css';
import { Drawer, SearchBar, Card, NoteForm } from "component";
import {useNote} from 'context';

import {addNote, editNote} from 'service';
import {useToast} from 'custom-hooks/useToast';

export const Home = () => {
  const initialNote = {
    title: '',
    body: ''
  };
  const {
    state: {
      notes,
      addFormFocus,
      editFormFocus
    }, 
    noteData, 
    setNoteData, 
    editNoteData,
    setEditNoteData,
    dispatch
  } = useNote();
  const {showToast} = useToast();

  const handleEditFormFocus = (id) => {
    dispatch({
      type: 'SET_NEW_NOTE_FOCUS', 
      payload: {
        editFormFocus: !editFormFocus,
        addFormFocus: false
      }});
    setEditNoteData(notes.find(note => note._id===id));
  }

  // function to add a new note
  const addNoteHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(!(noteData.title.trim() === '' && noteData.body.trim() === '')) {
      addNote(dispatch, {note: noteData}, showToast);
      setTimeout(() => {
        setNoteData(initialNote);
        dispatch({
          type: 'SET_NEW_NOTE_FOCUS', 
          payload: {
            editFormFocus: false,
            addFormFocus: false
          }});
      }, 1000)
    }
    setNoteData(initialNote);
    dispatch({
      type: 'SET_NEW_NOTE_FOCUS', 
      payload: {
        editFormFocus: false,
        addFormFocus: false
      }});
  }

  const setNoteFields = (e) => {
    const {name, value} = e.target;
    setNoteData({
      ...noteData,
      [name]: value
    });
  }

  const setEditNoteFields = (e) => {
    const {name, value} = e.target;
    setEditNoteData({
      ...editNoteData,
      [name]: value
    });
  }

  //fucntion to edit a note
  const editNoteHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(!(editNoteData.title.trim() === '' && editNoteData.body.trim() === '')) {
      editNote(dispatch, editNoteData._id, {note: editNoteData}, showToast);
      setTimeout(() => {
        setEditNoteData(initialNote);
        dispatch({
          type: 'SET_NEW_NOTE_FOCUS', 
          payload: {
            editFormFocus: false,
            addFormFocus: false
          }});
      }, 1000)
    }
    setEditNoteData(initialNote);
    dispatch({
      type: 'SET_NEW_NOTE_FOCUS', 
      payload: {
        editFormFocus: false,
        addFormFocus: false
    }});
  }
  return (
    <div className="wrapper">

      <div className={`overlay ${editFormFocus ? 'visible' : ''}`}>
        <div className={`edit-container ${editFormFocus ? 'show' : '' }`}>
          {/* Opens modal for edit note */}
          {editFormFocus &&
            <NoteForm 
              isForm={!addFormFocus}
              noteData={editNoteData}
              setFields={setEditNoteFields}
              addNoteHandler={editNoteHandler}
            />
          }
        </div>
      </div>

      <div className="container d-flex">
        <Drawer />
        <div className="d-flex justify-center center-body">
          <div className="drawer-app-content">
            <header className="drawer-top-bar">
              <SearchBar />
            </header>
            <main className="home-page-body">
              <div className="card-container">
                {/* opens modal for add note */}
                {addFormFocus 
                  && <NoteForm 
                      isForm={addFormFocus}
                      noteData={noteData}
                      setFields={setNoteFields}
                      addNoteHandler={addNoteHandler}
                    />
                }
              </div>
              {notes.length> 0 
                ?(<div className="notes-container d-flex flex-col">
                  {notes.map(note => 
                    <Card 
                      noteData={note} 
                      key={note._id} 
                      editNoteFocusHandler={handleEditFormFocus}
                    />
                  )}
                 </div>)
                : (<div className="no-notes-container">
                    <h5>Notes you add appear here</h5>
                  </div>)
              }
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}