import './card.css';
// icons import
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';

import { useRef, useState } from "react";
import { ColorPallet } from "component";
import { useOnClickOutside } from "custom-hooks/useOnClickOutside";

export const NoteForm = (
  {
    isForm,
    noteData,
    setFields,
    addNoteHandler,
  }) => {
  const ref = useRef();

  const [showOptionForNote, setOption] = useState({
    showColorPallet: false,
  });
  const {showColorPallet} = showOptionForNote;

  const optionHandler = (e, type) => {
    e.stopPropagation();
    switch (type) {
      case "COLOR":
      setOption(currentOption => ({
        ...currentOption,
        showColorPallet: !currentOption.showColorPallet
      })
      );
    }
  }

  //call this custome hook with different handlers based on if the form is for new note or edit note
  useOnClickOutside(ref, addNoteHandler)

  return (
    <div
      ref={ref}
    >
      {isForm &&
        <form className="card py-2 px-4"
          onSubmit={(e) => addNoteHandler(e)}
        >
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
                <ColorLensOutlinedIcon 
                  className="mx-2 icon" 
                  onClick={(e) => optionHandler(e, 'COLOR')}
                />
                {showColorPallet && <ColorPallet />}
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