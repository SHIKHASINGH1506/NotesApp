import { Drawer, SearchBar, NoteForm, NotesList } from "component";
import { useNote } from "context";
import { updateArchiveNote } from 'service';
import {useToast} from 'custom-hooks/useToast';

const Archive = () => {
const {
  state: {
    archives,
    archiveEditFormFocus,
    addFormFocus,
    editFormFocus,
  },
  dispatch,
  archiveNoteData,
  setArchiveNoteData,
} = useNote();
const initialNote = {
  title: '',
  body: ''
};
const {showToast} = useToast();

const handleArchieveEditFormFocus = (id) => {
   dispatch({
     type: 'SET_NEW_NOTE_FOCUS',
     payload: {
       archiveEditFormFocus: !archiveEditFormFocus,
       editFormFocus: false,
       addFormFocus: false
     }
   });
   setArchiveNoteData(archives.find(note => note._id===id));
}

const setEditArchiveNoteFields = (e) => {
  const {name, value} = e.target;
  setArchiveNoteData({
    ...archiveNoteData,
    [name]: value
  });
}

const editNoteHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();
    if(!(archiveNoteData.title.trim() === '' && archiveNoteData.body.trim() === '')) {
      updateArchiveNote(dispatch, archiveNoteData._id, {archiveNote: archiveNoteData}, showToast);
      setTimeout(() => {
        setArchiveNoteData(initialNote);
        dispatch({
          type: 'SET_NEW_NOTE_FOCUS', 
          payload: {
            archiveEditFormFocus: false,
            editFormFocus: false,
            addFormFocus: false,
          }});
      }, 1000)
    }
    setArchiveNoteData(initialNote);
    dispatch({
      type: 'SET_NEW_NOTE_FOCUS', 
      payload: {
        archiveEditFormFocus: false,
        editFormFocus: false,
        addFormFocus: false, 
    }});
}

return (
  <div className="wrapper">
    {/* Opens modal for edit note */}
    <div className={`overlay ${archiveEditFormFocus ? 'visible' : ''}`}>
      <div className={`edit-container ${archiveEditFormFocus ? 'show' : '' }`}>
        {archiveEditFormFocus &&
          <NoteForm 
            isForm={!addFormFocus}
            noteData={archiveNoteData}
            setFields={setEditArchiveNoteFields}
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
            {archives.length > 0
              ? 
              <NotesList 
                notes={archives}
                editNoteFocusHandler={handleArchieveEditFormFocus}
              />
              : (<div className="no-notes-container">
                <h5>Notes you add in archive appear here</h5>
              </div>)
            }
          </main>
        </div>
      </div>
    </div>
  </div>
)
}
export { Archive }