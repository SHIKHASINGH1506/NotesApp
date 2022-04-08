import './card.css';
// icons import

import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import LowPriorityIcon from '@mui/icons-material/LowPriority';

import { useRef, useState } from "react";
import { ColorPallet, PriorityBox } from "component";
import { useOnClickOutside } from "custom-hooks/useOnClickOutside";
import { Label } from 'component';

export const NoteForm = (
  {
    isForm,
    noteData,
    setFields,
    addNoteHandler,
    isAddFrom
  }) => {
  const ref = useRef();
  const {title, body, bgColor, _id, priority} = noteData;

  const [showOptionForNote, setOption] = useState({
    showColorPallet: false,
    showPriorityDropdown: false
  });
  const {showColorPallet, showPriorityDropdown} = showOptionForNote;

  const optionHandler = (e, type) => {
    e.stopPropagation();
    switch (type) {
      case "COLOR":
        return setOption(currentOption => ({
          ...currentOption,
          showColorPallet: !currentOption.showColorPallet
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
  const [backgroundColor, setBackgroundColor] = useState('');
  //call this custome hook with different handlers based on if the form is for new note or edit note
  useOnClickOutside(ref, addNoteHandler);

  const getColor = (e, color) => {
    e.preventDefault();
    e.stopPropagation();
    setBackgroundColor(color);
  }

  return (
    <div
      ref={ref}
    >
      {isForm &&
        <form 
          className="card py-2 px-4"
          style={{backgroundColor: isAddFrom ? backgroundColor : bgColor}}
          onSubmit={(e) => addNoteHandler(e, backgroundColor)}
        >
          <div className="card__title-wrapper d-flex items-center justify-between ">
            <textarea
              style={{backgroundColor: isAddFrom ? backgroundColor : bgColor}}
              className="card__title"
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              tabIndex="1"
              onChange={(e) => setFields(e)}
            >
            </textarea>
            <div 
              className="d-flex items-center light-text mx-2 icon">
              <PushPinOutlinedIcon className="mx-2 icon" />
            </div>
          </div>
          <textarea
            style={{backgroundColor: isAddFrom ? backgroundColor : bgColor}}
            className="card__content text-light"
            type="text"
            placeholder="Add a note..."
            name="body"
            value={body}
            tabIndex="2"
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
            <p>{priority}</p>
            <div className="card__action-icons d-flex justify-between">
              <div className="d-flex items-center light-text">
                <ColorLensOutlinedIcon 
                  className="mx-2 icon" 
                  onClick={(e) => optionHandler(e, 'COLOR')}
                />
                {showColorPallet && <ColorPallet getColor={getColor} />}
              </div>
              {/* <div className="d-flex items-center light-text">
                <LabelOutlinedIcon className="mx-2 icon"/>
              </div> */}
              <div className="d-flex items-center light-text">
                <LowPriorityIcon 
                  className="mx-2 icon"
                  onClick={e => optionHandler(e, 'PRIORITY')} 
                />
                {showPriorityDropdown && <PriorityBox setFields={setFields} priority={priority}/>}
              </div>
              {/* <div className="d-flex items-center light-text">
                <DeleteOutlineOutlinedIcon className="mx-2 icon" />
              </div>
              <div className="d-flex items-cente light-text">
                <ArchiveOutlinedIcon className="mx-2 icon" />
              </div> */}
            </div>
          </div>
        </form>}
    </div>
  );
}