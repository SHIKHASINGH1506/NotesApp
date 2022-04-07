const initialNoteState = {
  notes: [],
  trash: [],
  archives: [],
  labels: [],
  loading: false,
  error: null,
  addFormFocus: false,
  editFormFocus: false,
  archiveEditFormFocus: false,
  filterFormFocus: false
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
      editFormFocus,
      archiveEditFormFocus,
      filterFormFocus,
      labels, //not required
      label,
      labelId,
      isChecked
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
          addFormFocus,
          filterFormFocus,
          archiveEditFormFocus
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
    case 'UPDATE_ARCHIVE':
      return {
        ...state,
        archives
      }
    case 'SET_PIN':
      return{
        ...state,
        notes
      }
    case 'SET_LABEL': 
      const obj= {
        ...state,
        labels: [...state.labels, {label: label, id: labelId, isChecked: isChecked}],
      }
      console.log(obj);
      return obj;
    default: 
      return state;
  }
}
export { notesReducer, initialNoteState }