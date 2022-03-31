import axios from 'axios';

const addNote = async (dispatch, noteData, showToast) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const Headers = { authorization: token };
  try {
    const { data :{notes}, status } = await axios.post('/api/notes', noteData, { headers: Headers });
    if(status>=200 && status<=300){
      dispatch({type: 'UPDATE_NOTE', payload: notes});
      showToast('Note added!', 'success');
    }
    else{
      showToast('Note not added!', 'error');
      throw new Error("Couldn't add a new note!");
    }
  } catch (error) {
    console.log(error.message);
  }
}

export {addNote};
