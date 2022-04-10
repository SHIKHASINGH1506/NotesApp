import './drawer.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuid } from "uuid";

import { LabelInput } from 'component';
import {useNote} from "context";
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useState } from "react";

export const Drawer = () => {
  const {dispatch, state:{addFormFocus, labels}} = useNote();
  const [label, setLabel] = useState('');

  const addLabel = (e) => {
     e.preventDefault();
     e.stopPropagation();
     dispatch({type: 'SET_LABEL', payload: { label: label, labelId: uuid(), isChecked: false} });
     setLabel('');
  }
  const location = useLocation();

  const setLableField = (e) => {
    setLabel(e.target.value);
  }
  return (
    <aside className="side-navbar d-flex flex-col">
      <section className="drawer-menu">
        <ul className="nav-lists d-flex flex-col">
          <li className="nav-item d-flex items-center py-2 px-2">
            <Link to='/home' className="d-flex items-center active">
              <HomeOutlinedIcon className="mr-2 icon" />
              Home
            </Link>
          </li>
          <li className="nav-item d-flex flex-col py-2 px-2">
            <Link to='/label' className="d-flex items-center">
              <LabelOutlinedIcon className="mr-2 icon" />
              Labels
            </Link>
            {labels.length> 0 
            && <ul className="label-lists d-flex flex-col items-center">
              {labels.map( ({id, label}) => (
                <li className="py-2"key={id}>{label}</li>
            ))}
            </ul>}
          </li>
          <li className="nav-item d-flex items-center py-2 px-2">
            <Link to='/archive' className="d-flex items-center">
              <ArchiveOutlinedIcon className="mr-2 icon" />
              Archive
            </Link>
          </li>
          <li className="nav-item d-flex items-center py-2 px-2">
            <Link to ="/trash" className="d-flex items-center">
              <DeleteOutlineOutlinedIcon className="mr-2 icon" />
              Trash
            </Link>
          </li>
          <li className="nav-item d-flex items-center py-2 px-2">
            <Link to='' className="d-flex items-center">
              <FaceOutlinedIcon className="mr-2 icon" />
              Profile
            </Link>
          </li>
        </ul>
        <section className="py-2">
          <LabelInput 
            label={label} 
            addLabelHandler={addLabel}
            setlabelField={setLableField}/>
        </section>
       {location.pathname!=='/trash' && <button 
          className="bttn bttn-primary w-full my-2" 
          onClick={() => dispatch({
            type: 'SET_NEW_NOTE_FOCUS',
            payload: {
              editFormFocus: false,
              addFormFocus: true
            }
          })}>
          Create New Note
        </button>}
      </section>
    </aside> 
  )
}