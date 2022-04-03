const initialNoteState = {
  notes: [],
  trash: [],
  archives: [],
  loading: false,
  error: null,
  addFormFocus: false,
  editFormFocus: false
}
const notesReducer = (state, action) => {
  const {
    type, 
    payload : {
      notes,
      trash,
      archives,
      loading,
      error,
      addFormFocus,
      editFormFocus
    }
  } = action;
  switch (type) {
    case 'INIT_NOTES_SUCCESS':
      return {
        ...state,
          notes,
          loading,
          error,
          addFormFocus,
          editFormFocus
      };
    case 'INIT_NOTES_ERROR':
      return{
        ...state, 
          loading,
          error,
          addFormFocus,
          editFormFocus
      }
    case 'SET_NEW_NOTE_FOCUS' :
      return{
        ...state,
          editFormFocus,
          addFormFocus
      }
    case 'UPDATE_NOTE':
      return {
        ...state,
          notes
      };
    case 'MOVE_TO_TRASH': 
      return {
        ...state,
         trash
      };
    case 'SET_ARCHIVE':
      return {
        ...state,
        notes,
        archives
      }
    default: 
      return state;
  }
}
export { notesReducer, initialNoteState }