import './card.css';
//icons import 
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';


import {
  deleteNote,
  archiveNote,
  unArchiveNote,
  deleteArchiveNote,
  updateArchiveNote,
  editNote,
  restoreFromTrash,
  deleteFromTrash
} from 'service';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { Label, ColorPallet, PriorityBox } from 'component';
import { useToast } from 'custom-hooks/useToast';
import { useNote } from 'context';

export const Card = ({
  noteData,
  editNoteFocusHandler,
  pinHandler
}) => {
  const location = useLocation();
  const {
    title,
    body,
    _id,
    isArchive,
    isPinned,
    bgColor,
    tags,
    createdOn,
    priority } = noteData;
  const {
    dispatch,
    state: {
      notes,
      trash,
      archives
    } } = useNote();
  const { showToast } = useToast();
  const pinIcon = isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />;
  const [showOptionForNote, setOption] = useState({
    showColorPallet: false,
    showLabelEditor: false,
    showPriorityDropdown: false
  });
  const {
    showColorPallet,
    showLabelEditor,
    showPriorityDropdown } = showOptionForNote;

  const deleteNoteHandler = (e, id) => {
    e.stopPropagation();
    if (isArchive) {
      deleteArchiveNote(dispatch, id, showToast);
    }
    else {
      deleteNote(dispatch, id, showToast);
    }
  }

  const permanentDeleteHandler = (e, id) => {
    e.stopPropagation();
    deleteFromTrash(dispatch, id, showToast);
  }

  const restoreFromTrashHandler = async (e, id) => {
    e.stopPropagation();
    try {
      const { data: { trash, notes, archives } } = await restoreFromTrash(id, showToast);
      dispatch({
        type: 'RESTORE_FROM_TRASH',
        payload: {
          trash,
          notes,
          archives
        }
      });
      showToast('Restored from trash', 'success');
    } catch (error) {
      showToast('Could not restore from trash', 'error');
      console.log(error.response.data);
    }
  }

  const archiveNoteHandler = (e, id, archiveData) => {
    e.stopPropagation();
    isArchive
      ? unArchiveNote(dispatch, id, archiveData, showToast)
      : archiveNote(dispatch, id, archiveData, showToast);
  }

  const setPriorityFields = async e => {
    e.stopPropagation();
    const updatedNote = { ...noteData, priority: e.target.value };
    if(isArchive)
     updateArchiveNote(dispatch, _id, { archiveNote: updatedNote }, showToast)
    else{
      try{
        const { data :{notes} } = await editNote(_id, {note:updatedNote});
         dispatch({
           type: 'UPDATE_NOTE', 
           payload: {notes}
         });
         showToast('Priority updated', 'success');
       }catch(error){
         console.log(error.response.data);
         showToast('Priority could not update', 'error');
       }
    }
  }

  const optionHandler = (e, type) => {
    e.stopPropagation();
    switch (type) {
      case "COLOR":
        return setOption(currentOption => ({
          ...currentOption,
          showColorPallet: !currentOption.showColorPallet,
        })
        );
      case "LABEL":
        return setOption(currentOption => ({
          ...currentOption,
          showLabelEditor: !currentOption.showLabelEditor
        })
        );
      case 'PRIORITY':
        return setOption(currentOption => ({
          ...currentOption,
          showPriorityDropdown: !currentOption.showPriorityDropdown
        })
        );
    }
  }

  const getColor = async (e, color) => {
    e.preventDefault();
    e.stopPropagation();
    const coloredNote = { ...noteData, bgColor: color };
    if (isArchive) {
      updateArchiveNote(dispatch, _id, { archiveNote: coloredNote })
    }
    else {
      try {
        const { data: { notes } } = await editNote(_id, { note: coloredNote });
        dispatch({
          type: 'UPDATE_NOTE',
          payload: { notes }
        });
        showToast('Color changed successfully', 'success');
      } catch (error) {
        showToast('Error in color change', 'error');
        console.log(error.response.data);
      }
    }
  }

  const priorityPillStyle = {
    backgroundColor: priority === 'None'
      ? '#929191'
      : priority === 'Low'
        ? '#4a924a'
        : priority === 'Medium'
          ? '#ffc107'
          : '#ff5722'
  }

  const archiveIcon = isArchive ? <UnarchiveOutlinedIcon /> : <ArchiveOutlinedIcon />;
  return (
    <div className="card py-2 px-4"
      style={{ backgroundColor: bgColor }}
      onClick={() => editNoteFocusHandler(_id)}>
      <div className="card__title-wrapper d-flex items-center justify-between ">
        <div className="card__title">{title}</div>
      </div>
      <div className="card__content text-light">
        {body}
      </div>
      {tags.length > 0 &&
        <div className="tag-wrapper d-flex my-2">
          {tags.map(({ labelId, label }) => (
            <div key={labelId} className="badge badge-label rounded-pill">{label}</div>
          ))}
        </div>
      }
      {priority &&
        <div className="badge badge-label rounded-pill" style={priorityPillStyle}>P-{priority}</div>
      }
      <div className="card__footer-wrapper d-flex items-center justify-between">
        <div className="small-text light-text">Created on: {createdOn}</div>
        <div className="card__action-icons d-flex justify-between">
          {location.pathname !== '/trash' &&
            <div className="d-flex items-center light-text">
              <ColorLensOutlinedIcon
                className="mx-2 icon"
                onClick={(e) => optionHandler(e, 'COLOR')}
              />
              {showColorPallet && <ColorPallet getColor={getColor} />}
            </div>
          }
          {location.pathname !== '/trash' &&
            <div className="d-flex items-center light-text">
              <LabelOutlinedIcon
                className="mx-2 icon"
                onClick={e => optionHandler(e, 'LABEL')}
              />
              {showLabelEditor && <Label id={_id} noteData={noteData} />}
            </div>
          }
          {location.pathname !== '/trash' &&
            <div className="d-flex items-center light-text">
              <LowPriorityIcon
                className="mx-2 icon"
                onClick={e => optionHandler(e, 'PRIORITY')}
              />
              {showPriorityDropdown && <PriorityBox setFields={setPriorityFields} priority={priority} />}
            </div>
          }
          {location.pathname !== '/trash' &&
            <div className="d-flex items-cente light-text mx-2 icon"
              onClick={(e) => archiveNoteHandler(e, _id, noteData)}>
              {archiveIcon}
            </div>
          }
          {location.pathname !== '/trash' &&
            <div className="d-flex items-center light-text">
              <DeleteOutlineOutlinedIcon
                className="mx-2 icon"
                onClick={(e) => deleteNoteHandler(e, _id)} />
            </div>
          }
          {location.pathname === '/trash' &&
            <div className="d-flex items-center light-text">
              <DeleteForeverOutlinedIcon
                className="mx-2 icon"
                onClick={(e) => permanentDeleteHandler(e, _id)} />
            </div>
          }
          {location.pathname === '/trash' &&
            <div className="d-flex items-center light-text">
              <RestoreOutlinedIcon
                className="mx-2 icon"
                onClick={e => restoreFromTrashHandler(e, _id)}
              />
            </div>
          }
        </div>
      </div>
    </div>
  )
}