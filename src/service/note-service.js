import axios from 'axios';

const getNotes = async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const Headers = { authorization: token };
  try {
    const { data :{notes}, status } = await axios.get('/api/notes', { headers: Headers });
    if(status>=200 && status<=300){
      dispatch({
        type: 'INIT_NOTES_SUCCESS', 
        payload: {
          notes,
          loading: false,
          error: null,
          addFormFocus: false,
          editFormFocus: false
        }});
    }
    else{
      throw new Error("Couldn't get notes! Please try again later.");
    }
  } catch (error) {
    dispatch({
      type: 'INIT_NOTES_ERROR',
      payload: {
        loading: false,
        error: error.message,
        addFormFocus: false,
        editFormFocus: false
      }
    })
  }
}

const addNote = async (noteData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const Headers = { authorization: token };
  return await axios.post('/api/notes', noteData, { headers: Headers });
}

const editNote = async (id, editNoteData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const Headers = { authorization: token };
  return await axios.post(`/api/notes/${id}`, editNoteData, { headers: Headers });
}

const deleteNote = async (dispatch, id, showToast) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const Headers = { authorization: token };
  try {
    const { data :{notes, trash} } = await axios.delete(`/api/notes/${id}`, { headers: Headers });
    dispatch({
      type: 'UPDATE_NOTE', 
      payload: {
        notes, 
        trash
      }});
    showToast('Moved to trash.', 'success');
  } catch (error) {
    showToast('Note not deleted!', 'error');
    console.log(error.response.data);
  }
}

export {addNote, editNote, getNotes, deleteNote};
