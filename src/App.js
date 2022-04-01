import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
// import Mockman from 'mockman-js';

import { LandingPage, Home, Login, Signup } from './Pages';
import { Navbar } from "./component";
import {useNote} from "context";
import {addNote} from 'service/note-service';
import {useToast} from 'custom-hooks/useToast';

function App() {
  const {
    noteData, 
    setNoteData, 
    dispatch,
    state : {
      addFormFocus
    }
  } = useNote();
  const {showToast} = useToast();
  const initialNote = {
    title: '',
    body: ''
  };

  const onPageClickHandler = (e) => {
    e.stopPropagation();
    if(!(noteData.title.trim() === '' && noteData.body.trim() === '')) {
      addNote(dispatch, {note: noteData}, showToast);
      setTimeout(() => {
        setNoteData(initialNote);
        dispatch({
          type: 'SET_NEW_NOTE_FOCUS',
          payload: {
            addFormFocus: false,
            editFormFocus: false
          }
        })
      }, 1000)
    }
    setNoteData(initialNote);
   addFormFocus 
    ? dispatch({
      type: 'SET_NEW_NOTE_FOCUS',
      payload: {
        addFormFocus: false,
        editFormFocus: false
      }
      })
    : "";
  }
  return (
    <div className="App">
      <div onClick={(e) => onPageClickHandler(e)}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
        <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          {/* <Route path='/mockman' element={<Mockman />} /> */}
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
