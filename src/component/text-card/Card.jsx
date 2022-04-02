import './card.css';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { deleteNote } from 'service';
import { useToast } from 'custom-hooks/useToast';
import { useNote } from 'context';

export const Card = ({noteData, editNoteFocusHandler}) => {
  const {title, body, _id} = noteData;
  const {dispatch} = useNote();
  const {showToast} = useToast();

  const deleteNoteHandler = (e, id) => {
    e.stopPropagation();
    deleteNote(dispatch, id, showToast);
  }
  return (
    <div className="card py-2 px-4" onClick={() => editNoteFocusHandler( _id)}>
      <div className="card__title-wrapper d-flex items-center justify-between ">
        <div className="card__title">{title}</div>
        <div className="d-flex items-center light-text">
          <PushPinOutlinedIcon className="mx-2 icon" />
        </div>
      </div>
      <div className="card__content text-light">
        {body}
      </div>
      <div className="card__footer-wrapper d-flex items-center justify-between">
        <div className="small-text light-text">Created on 26/01/2021</div>
        <div className="card__action-icons d-flex justify-between">
          <div className="d-flex items-center light-text">
            <ColorLensOutlinedIcon className="mx-2 icon" />
          </div>
          <div className="d-flex items-center light-text">
            <LabelOutlinedIcon className="mx-2 icon" />
          </div>
          <div className="d-flex items-center light-text">
            <DeleteOutlineOutlinedIcon className="mx-2 icon" onClick={(e) => deleteNoteHandler(e, _id)}/>
          </div>
          <div className="d-flex items-cente light-text">
            <ArchiveOutlinedIcon className="mx-2 icon" />
          </div>
        </div>
      </div>
    </div>
  )
}