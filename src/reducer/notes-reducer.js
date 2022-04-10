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
      const obj = {
        ...state,
          notes,
          loading,
          error,
          addFormFocus,
          editFormFocus
      };
      console.log(obj);
      return obj;
      case 'INIT_ARCHIVES_SUCCESS':
        return {
          ...state,
            archives,
            loading,
            error,
            addFormFocus,
            editFormFocus
        };
      case 'INIT_TRASH_SUCCESS':
        return {
          ...state,
            trash,
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
          // filterFormFocus,
          archiveEditFormFocus
      }
    case 'UPDATE_NOTE':
      return {
        ...state,
          notes,
          trash: trash || state.trash

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
        archives,
        trash: trash||state.trash
      }
    case 'SET_PIN':
      return{
        ...state,
        notes
      }
    case 'SET_LABEL': 
      return {
        ...state,
        labels: [...state.labels, {label: label, id: labelId, isChecked: isChecked}],
      }
    case 'SET_TRASH':
      return{
        ...state,
        trash
      }
    case 'RESTORE_FROM_TRASH':  
      return {
        ...state,
        trash,
        notes,
        archives
      }
    default: 
      return state;
  }
}
export { notesReducer, initialNoteState }