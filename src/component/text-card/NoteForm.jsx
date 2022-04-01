import './card.css';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';

export const NoteForm = ( 
  {
    isForm, 
    noteData, 
    setFields, 
    addNoteHandler
  }) => 
  {
    return (
      <div onClick={(e) => e.stopPropagation()}>
      {isForm && <form className="card py-2 px-4" onSubmit={(e) => addNoteHandler(e)}>
        <div className="card__title-wrapper d-flex items-center justify-between ">
          <textarea 
            className="card__title" 
            type="text"
            placeholder="Title"
            name="title"
            value={noteData.title}
            onChange={(e) => setFields(e)}
          >
          </textarea>
          <div className="d-flex items-center light-text">
            <PushPinOutlinedIcon className="mx-2 icon" />
          </div>
        </div>
        <textarea 
          className="card__content text-light" 
          type="text"
          placeholder="Add a note..."
          name="body"
          value={noteData.body}
          onChange={(e) => setFields(e)}
          >
        </textarea>
        <div className="card__footer-wrapper d-flex items-center justify-between">
          <button 
            className="bttn-without-padding"
            type="submit"
          >
            Add Note
          </button>
          <div className="card__action-icons d-flex justify-between">
            <div className="d-flex items-center light-text">
              <ColorLensOutlinedIcon className="mx-2 icon" />
            </div>
            <div className="d-flex items-center light-text">
              <LabelOutlinedIcon className="mx-2 icon" />
            </div>
            <div className="d-flex items-center light-text">
              <DeleteOutlineOutlinedIcon className="mx-2 icon" />
            </div>
            <div className="d-flex items-cente light-text">
              <ArchiveOutlinedIcon className="mx-2 icon" />
            </div>
          </div>
        </div>
      </form>}
    </div>
  );
}