import './home.css';
import { Drawer, SearchBar, NoteForm, NotesList, AddNotePortal } from "component";
import { useNote, useSortFilter } from 'context';
import { editNote } from 'service';
import { useToast } from 'custom-hooks/useToast';
import { getFilteredSortedNotes } from 'utils/getFilteredSortedNotes';


export const Home = () => {
  const initialNote = {
    title: '',
    body: '',
    bgColor: ''
  };
  const {
    state: {
      notes,
      addFormFocus,
      editFormFocus,
      archiveEditFormFocus
    }, 
    editNoteData,
    setEditNoteData,
    dispatch
  } = useNote();
  const {sortFilterState: {sortBy, filterBylabels, sortByPriority}, searchText, searchHandler} = useSortFilter();
  const {showToast} = useToast();
  const handleEditFormFocus = (id) => {
    dispatch({
      type: 'SET_NEW_NOTE_FOCUS', 
      payload: {
        editFormFocus: !editFormFocus,
        addFormFocus: false,
        archiveEditFormFocus: false,
      }});
    setEditNoteData(notes.find(note => note._id===id));
  }
  //function to set edit note fields
  const setEditNoteFields = (e) => {
    const {name, value} = e.target;
    setEditNoteData({
      ...editNoteData,
      [name]: value
    });
  }
  //fucntion to edit note
  const editNoteHandler = async e => {
    e.preventDefault();
    e.stopPropagation();
    try{

      const { data :{notes} } = await editNote(editNoteData._id, {note: editNoteData});
      dispatch({
        type: 'UPDATE_NOTE', 
        payload: {notes}
      });
      showToast('Note updated successfully', 'success');
      setTimeout(() => {
        setEditNoteData(initialNote);
        dispatch({
          type: 'SET_NEW_NOTE_FOCUS', 
          payload: {
            editFormFocus: false,
            addFormFocus: false
          }});
      }, 1000)
    }catch(error){
      showToast('Could not update note', 'error');
    }
  }

  //function to pin existing note
  const pinHandler = (e, id) => {
    e.stopPropagation();
    const newNotes = notes.map(note => {
      if(note._id === id )
         return {...note, isPinned: !note.isPinned}
      else
        return note;
      });
      dispatch({
        type:'SET_PIN',
        payload: {
          notes: newNotes
        }
      });   
  }
  const notesAfterFilterSort = getFilteredSortedNotes(notes, filterBylabels, sortBy, sortByPriority, searchText);
  return (
    <div className="wrapper">
      <div className={`overlay ${editFormFocus ? 'visible' : ''}`}>
        <div className={`modal-wrapper ${editFormFocus ? 'show' : '' }`}>
          {/* Opens modal for edit note */}
          {editFormFocus &&
            <NoteForm 
              isForm={!addFormFocus}
              noteData={editNoteData}
              setFields={setEditNoteFields}
              addNoteHandler={editNoteHandler}
              isAddFrom={false}
            />
          }
        </div>
      </div>

      <div className="container d-flex">
        <Drawer />
        <div className="d-flex justify-center center-body">
          <div className="drawer-app-content">
            <header className="drawer-top-bar">
              <SearchBar 
                notesType='notes'/>
            </header>
            <button 
              className="bttn bttn-primary my-2 mobile-add-note-btn"
              onClick={() => dispatch({
                  type: 'SET_NEW_NOTE_FOCUS',
                  payload: {
                    editFormFocus: false,
                    addFormFocus: !addFormFocus
                  }
              })}
            >
              Create New Note
            </button>
            <main className="home-page-body">
               {addFormFocus && <AddNotePortal/>}
               <div className="card-container" id="addPortal"> 
              </div>
              {notesAfterFilterSort.length> 0 
                ?
                <NotesList 
                  notes={notesAfterFilterSort}
                  editNoteFocusHandler={handleEditFormFocus}
                />
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