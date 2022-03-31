const initialNoteState = {
  notes: [],
}
const notesReducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: [...payload]
      };
      
    default: 
      return state;
  }
}
export { notesReducer, initialNoteState }