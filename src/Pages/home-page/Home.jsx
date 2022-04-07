import './home.css';
import { Drawer, SearchBar, NoteForm, NotesList, FilterModal } from "component";
import { useNote, useSortFilter } from 'context';
import { addNote, editNote } from 'service';
import { useToast } from 'custom-hooks/useToast';
import { getFormattedDate } from 'utils/getFormatedDate';
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
      archives,
      addFormFocus,
      editFormFocus,
      filterFormFocus,
      archiveEditFormFocus
    }, 
    noteData, 
    setNoteData, 
    editNoteData,
    setEditNoteData,
    dispatch
  } = useNote();
  console.log(notes, archives);
  const {sortFilterState: {sortBy, filterBylabels}, searchText, searchHandler} = useSortFilter();
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

  // const handleFilterFocus = (e) => {
  //   e.stopPropagation();
  //   dispatch({
  //     type: 'SET_NEW_NOTE_FOCUS', 
  //     payload: {
  //       editFormFocus: false,
  //       addFormFocus: false,
  //       archiveEditFormFocus: false,
  //       filterFormFocus: !filterFormFocus
  //     }});
  // }
  // function to add a new note
  const addNoteHandler = (e, color) => {
    e.preventDefault();
    e.stopPropagation();
    if(!(noteData.title.trim() === '' && noteData.body.trim() === '')) {
      addNote(
        dispatch, 
        {note: {
          ...noteData, 
          isArchive: false,
          isPinned: false,
          bgColor: color,
          createdOn: getFormattedDate()
        }}, 
        showToast);
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

  // function to set add note fields
  const setNoteFields = (e) => {
    const {name, value} = e.target;
    setNoteData({
      ...noteData,
      [name]: value
    });
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
  const editNoteHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(!(editNoteData.title.trim() === '' && editNoteData.body.trim() === '')) {
      editNote(dispatch, editNoteData._id, {note: editNoteData}, showToast);
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
    }
    setEditNoteData(initialNote);
    dispatch({
      type: 'SET_NEW_NOTE_FOCUS', 
      payload: {
        editFormFocus: false,
        addFormFocus: false
    }});
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
  //const sortedNotes = getSortedNotes(notes, sortBy);
  const notesAfterFilterSort = getFilteredSortedNotes(notes, filterBylabels, sortBy, searchText);
  console.log(notesAfterFilterSort); 
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
{/* 
      <div className={`overlay ${filterFormFocus ? 'visible' : ''}`}>
        <div className={`modal-wrapper ${filterFormFocus ? 'show' : '' }`}>
          {filterFormFocus &&
            <FilterModal handleFilterFocus={handleFilterFocus}/>
          }
        </div>
      </div> */}

      <div className="container d-flex">
        <Drawer />
        <div className="d-flex justify-center center-body">
          <div className="drawer-app-content">
            <header className="drawer-top-bar">
              <SearchBar 
                // handleFilterFocus={handleFilterFocus}
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
              <div className="card-container">
                {/* opens modal for add note */}
                {addFormFocus
                  && <NoteForm 
                      isForm={addFormFocus}
                      noteData={noteData}
                      setFields={setNoteFields}
                      addNoteHandler={addNoteHandler}
                      isAddFrom={true}
                    />
                }
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