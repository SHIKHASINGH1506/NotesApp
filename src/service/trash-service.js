import axios from 'axios';

const getNotesFromTrash = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const Headers = { authorization: token };
  return await axios.get('/api/trash', { headers: Headers });
}

const deleteFromTrash = async (dispatch, id, showToast) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const Headers = { authorization: token };
  try {
    const { data :{trash} } = await axios.delete(`/api/trash/delete/${id}`, { headers: Headers });
    dispatch({
      type: 'SET_TRASH', 
      payload: {
        trash
      }});
    showToast('Deleted From trash.', 'success');
  } catch (error) {
    showToast('Note not deleted!', 'error');
    console.log(error.response.data);
  }
}

const restoreFromTrash = async ( id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const Headers = { authorization: token };
 return  await axios.post(`/api/trash/restore/${id}`, {}, { headers: Headers });
}
export {getNotesFromTrash, restoreFromTrash, deleteFromTrash}