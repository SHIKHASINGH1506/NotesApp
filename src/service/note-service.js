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

const addNote = async (dispatch, noteData, showToast) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const Headers = { authorization: token };
  try {
    const { data :{notes}, status } = await axios.post('/api/notes', noteData, { headers: Headers });
    if(status>=200 && status<=300){
      dispatch({type: 'UPDATE_NOTE', payload: {notes}});
      showToast('Note added!', 'success');
    }
    else{
      showToast('Note not added!', 'error');
      throw new Error("Couldn't add a new note!");
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

const editNote = async (dispatch, id, editNoteData, showToast) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const Headers = { authorization: token };
  try {
    const { data :{notes}, status } = await axios.post(`/api/notes/${id}`, editNoteData, { headers: Headers });
    if(status>=200 && status<=300){
      dispatch({
        type: 'UPDATE_NOTE', 
        payload: {
          notes
        }});
      showToast('Note edited!', 'success');
    }
    else{
      showToast('Note not edited!', 'error');
      throw new Error("Couldn't edit note!");
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

const deleteNote = async (dispatch, id, showToast) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const Headers = { authorization: token };
  try {
    const { data :{notes} } = await axios.delete(`/api/notes/${id}`, { headers: Headers });
    dispatch({
      type: 'UPDATE_NOTE', 
      payload: {
        notes
      }});
    showToast('Moved to trash.', 'success');
  } catch (error) {
    showToast('Note not deleted!', 'error');
    console.log(error.response.data);
  }
}

export {addNote, editNote, getNotes, deleteNote};
