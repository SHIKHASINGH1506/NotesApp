import './card.css';
//icons import 
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import PushPinIcon from '@mui/icons-material/PushPin'; 


import { deleteNote, archiveNote, unArchiveNote, deleteArchiveNote } from 'service';
import { useState} from 'react';
import { Label, ColorPallet } from 'component';
import { useToast } from 'custom-hooks/useToast';
import { useNote } from 'context';

export const Card = ({
  noteData, 
  editNoteFocusHandler, 
  // isPinned, 
  pinHandler 
  }) => {

  const {title, body, _id, isArchive, isPinned, bgColor, tags, createdOn} = noteData;
  const {
    dispatch, 
    state : {
      notes,
      trash, 
      archives
    }} = useNote();
  const {showToast} = useToast();
  const pinIcon = isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />;
  const [showOptionForNote, setOption] = useState({
    showColorPallet: false,
    showLabelEditor: false
  });

  const {showColorPallet, showLabelEditor} = showOptionForNote;

  const deleteNoteHandler = (e, id) => {
    e.stopPropagation();
    //trigger if archived note to be deleted
    if(isArchive){
      const archivedNote = archives.find(note => note._id === id);
      dispatch({
        type:"MOVE_TO_TRASH",
        payload: {
          trash: [...trash, archivedNote]
        }
      });
      deleteArchiveNote(dispatch, id, showToast);
    }
    //trigger if note to be deleted
    else{
      const note = notes.find(note => note._id === id);

      // to move deleted note to trash
      dispatch({
        type:"MOVE_TO_TRASH",
        payload: {
          trash: [...trash, note]
        }
      });
  
      // api call to delete note from note list
      deleteNote(dispatch, id, showToast);
    }
  }

  const archiveNoteHandler = (e, id, archiveData) => {
    e.stopPropagation();
    isArchive 
      ? unArchiveNote(dispatch, id, archiveData, showToast) 
      : archiveNote(dispatch, id, archiveData, showToast);   
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
    }
  }
  const getColor = (e, color) => {
    e.preventDefault();
    e.stopPropagation();
    isArchive
     ? dispatch({
        type:'UPDATE_ARCHIVE',
        payload:{
          archives: archives.map(note=> note._id === _id ? {...note, bgColor: color} : note)
        }
      })
    : 
     dispatch({
        type:'UPDATE_NOTE',
        payload:{
          notes: notes.map(note=> note._id === _id ? {...note, bgColor: color} : note)
        }
      })
  }

  const archiveIcon = isArchive ? <UnarchiveOutlinedIcon /> : <ArchiveOutlinedIcon />;
  return (
    <div className="card py-2 px-4" 
      style={{backgroundColor: bgColor}}
      onClick={() => editNoteFocusHandler( _id)}>
      <div className="card__title-wrapper d-flex items-center justify-between ">
        <div className="card__title">{title}</div>
        <div 
          className="d-flex items-center light-text mx-2 icon"
          onClick={pinHandler}>
          {/* <PushPinOutlinedIcon className="mx-2 icon" /> */}
          {pinIcon}
        </div>
      </div>
      <div className="card__content text-light">
        {body}
      </div>
     {tags.length>0 &&
      <div className="tag-wrapper d-flex">
        {tags.map(({labelId, label}) => (
          <div key={labelId} className="badge badge-label rounded-pill">{label}</div>
        ))}
      </div>
      }
      <div className="card__footer-wrapper d-flex items-center justify-between">
        <div className="small-text light-text">Created on: {createdOn}</div>
        <div className="card__action-icons d-flex justify-between">
          <div className="d-flex items-center light-text">
            <ColorLensOutlinedIcon 
              className="mx-2 icon" 
              onClick={(e) => optionHandler(e, 'COLOR')}
            />
            {showColorPallet && <ColorPallet getColor={getColor} />}
          </div>
          <div className="d-flex items-center light-text">
            <LabelOutlinedIcon 
              className="mx-2 icon"
              onClick={e => optionHandler(e, 'LABEL')}
            />
            {showLabelEditor && <Label id={_id} noteData={noteData} />}
          </div>
          <div className="d-flex items-center light-text">
            <DeleteOutlineOutlinedIcon 
              className="mx-2 icon" 
              onClick={(e) => deleteNoteHandler(e, _id)}/>
          </div>
          <div className="d-flex items-cente light-text mx-2 icon"
            onClick={(e) => archiveNoteHandler(e, _id, noteData)}>
            {archiveIcon}
          </div>
        </div>
      </div>
    </div>
  )
}