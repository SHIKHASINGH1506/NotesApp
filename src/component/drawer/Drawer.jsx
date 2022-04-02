import './drawer.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';

import {useNote} from "context";
import { Link } from 'react-router-dom';

export const Drawer = () => {
  const {dispatch, state:{addFormFocus}} = useNote();
  return (
    <aside className="side-navbar d-flex flex-col">
      <div className="drawer-menu">
        <ul className="nav-lists d-flex flex-col">
          <li className="nav-item d-flex items-center py-2 px-2">
            <span className="d-flex items-center active">
              <HomeOutlinedIcon className="mr-2 icon" />
              Home
            </span>
          </li>
          <li className="nav-item d-flex items-center py-2 px-2">
            <span className="d-flex items-center">
              <LabelOutlinedIcon className="mr-2 icon" />
              Labels
            </span>
          </li>
          <li className="nav-item d-flex items-center py-2 px-2">
            <span className="d-flex items-center">
              <ArchiveOutlinedIcon className="mr-2 icon" />
              Archive
            </span>
          </li>
          <li className="nav-item d-flex items-center py-2 px-2">
            <Link to ="/trash" className="d-flex items-center">
              <DeleteOutlineOutlinedIcon className="mr-2 icon" />
              Trash
            </Link>
          </li>
          <li className="nav-item d-flex items-center py-2 px-2">
            <span className="d-flex items-center">
              <FaceOutlinedIcon className="mr-2 icon" />
              Profile
            </span>
          </li>
        </ul>
        <button 
          className="bttn bttn-primary w-full my-2" 
          onClick={() => dispatch({
            type: 'SET_NEW_NOTE_FOCUS',
            payload: {
              editFormFocus: false,
              addFormFocus: !addFormFocus
            }
          })}>
          Create New Note
        </button>
      </div>
    </aside> 
  )
}