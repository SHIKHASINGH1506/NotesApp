import axios from 'axios';

//api call for adding notes to arcihive
const archiveNote = async (dispatch, id, archiveData, showToast) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const Headers = { authorization: token };
  try {
    const { data: { notes, archives } } = await axios.post(`/api/notes/archives/${id}`, archiveData, { headers: Headers });
    dispatch({
      type: 'SET_ARCHIVE',
      payload: {
        notes,
        archives
      }
    });
    showToast('Moved to archive.', 'success');
  } catch (error) {
    showToast('Couldn"t archive!', 'error');
    console.log(error.message);
  }
}

//api call for restoring notes from archive
const unArchiveNote = async (dispatch, id, archiveData, showToast) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const Headers = { authorization: token };
  try {
    const { data: { notes, archives } } = await axios.post(`/api/archives/restore/${id}`, archiveData, { headers: Headers });
    dispatch({
      type: 'SET_ARCHIVE',
      payload: {
        notes,
        archives
      }
    });
    showToast('Restored from archive.', 'success');
  } catch (error) {
    showToast('Couldn"t restored!', 'error');
    console.log(error.message);
  }
}

const deleteArchiveNote = async (dispatch, id, showToast) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const Headers = { authorization: token };
  try {
    const { data :{archives} } = await axios.delete(`/api/archives/delete/${id}`, { headers: Headers });
    dispatch({
      type: 'UPDATE_ARCHIVE', 
      payload: {
        archives
      }});
    showToast('Deleted! Moved to trash.', 'success');
  } catch (error) {
    showToast('Note not deleted!', 'error');
    console.log(error.message);
  }
}

const updateArchiveNote = async (dispatch, id, archiveData, showToast) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const Headers = { authorization: token };
  try {
    const { data : {archives} } = await axios.post(`/api/archives/${id}`, archiveData, { headers: Headers });
    console.log(archives);
    dispatch({
      type: 'UPDATE_ARCHIVE', 
      payload: {
        archives
      }});
    showToast('Note updated!', 'success');
  } catch (error) {
    showToast('Note couldn"t update!', 'error');
    console.log(error.message);
  }
}

export {archiveNote, unArchiveNote, deleteArchiveNote, updateArchiveNote}