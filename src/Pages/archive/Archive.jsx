import { Drawer, SearchBar, NoteForm, NotesList, AddNotePortal } from "component";
import { useNote, useSortFilter } from "context";
import { updateArchiveNote } from 'service';
import {useToast} from 'custom-hooks/useToast';
import { getFilteredSortedNotes } from 'utils/getFilteredSortedNotes';

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
const {sortFilterState: {sortBy, filterBylabels, sortByPriority}, searchText, searchHandler} = useSortFilter();
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
const notesAfterFilterSort = getFilteredSortedNotes(archives, filterBylabels, sortBy, sortByPriority, searchText);
return (
  <div className="wrapper">
    {/* Opens modal for edit note */}
    <div className={`overlay ${archiveEditFormFocus ? 'visible' : ''}`}>
      <div className={`modal-wrapper ${archiveEditFormFocus ? 'show' : '' }`}>
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
            {addFormFocus && <AddNotePortal/>}
            <div className="card-container" id="addPortal"></div>
            {notesAfterFilterSort.length > 0
              ? 
              <NotesList 
                notes={notesAfterFilterSort}
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