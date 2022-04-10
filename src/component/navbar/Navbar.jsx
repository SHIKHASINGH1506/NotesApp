import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from 'context';
import { useState } from 'react';
import { LabelInput } from 'component';
import { useNote } from 'context';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuid } from "uuid";


export const Navbar = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [slider, setSlider] = useState(false);
    const {dispatch, state:{addFormFocus, labels}} = useNote();
    const [label, setLabel] = useState('');
    const logoutUser = () => {
        setAuth({
            isAuth: false,
            token: '',
            user: {}
        });
        localStorage.clear();
        navigate('/');
    }
    const addLabel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({type: 'SET_LABEL', payload: { label: label, labelId: uuid(), isChecked: false} });
        setLabel('');
     }
   
     const setLableField = (e) => {
       setLabel(e.target.value);
     }
     const sliderHandler=(e) => {
        e.stopPropagation();
        setSlider(currentSlidingState => !currentSlidingState) 
     }
    const isAuth = localStorage.getItem("isAuth");
    return (
        <header className="navbar-home" onClick={e=> e.stopPropagation()}>
            <nav className="navbar-wrapper d-flex justify-between items-center">
                <div className="d-flex items-center w-50">
                    <svg
                        className="sidebar-toggler"
                        id="sidebar-toggler"
                        viewBox="0 0 100 40"
                        width="40"
                        height="40"
                        onClick={(e) => sliderHandler(e)}
                    >
                        <rect width="60" height="10"></rect>
                        <rect y="20" width="60" height="10"></rect>
                        <rect y="40" width="60" height="10"></rect>
                    </svg>
                    <Link className="brand-logo mx-2" to="/">Noter</Link>
                </div>
                {isAuth && <div className="d-flex">
                    <LogoutIcon onClick={() => logoutUser()} />
                </div>}
                <div className={`sidebar-wrapper ${slider ? 'show' : ''}`} id="sidebar-wrapper">
                    <div className={`sidebar ${slider ? 'view' : ''}`} id="sidebar">
                        <ul className="sidebar-list sidebar-collapse">
                            <li className="sidebar-item hide d-flex items-center">
                                <Link className="sidebar-item-link profile-icon" to="#"><i className="fas fa-user"></i></Link>
                                <CloseIcon className="left-icon icon" onClick={() => setSlider(false)}/>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-item-link" to="/home">Home</Link>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-item-link" to="/label">Labels</Link>
                                {labels.length> 0 &&
                                    <ul className="label-lists d-flex flex-col items-center">
                                    {labels.map( ({id, label}) => (
                                        <li className="py-2"key={id}>{label}</li>
                                    ))}
                                    </ul>}
                            </li>
                            <li className="sidebar-item hide">
                                <Link className="sidebar-item-link" to="">Archive</Link>
                            </li>
                            <li className="sidebar-item hide">
                                <Link className="sidebar-item-link" to="#">Trash</Link>
                            </li>
                            <li className="sidebar-item hide">
                                <Link className="sidebar-item-link" to="#">Profile</Link>
                            </li>
                        </ul>
                        <section className="py-2">
                            <LabelInput
                                label={label}
                                addLabelHandler={addLabel}
                                setlabelField={setLableField} 
                            />
                        </section>
                    </div>
                </div>
            </nav>
        </header>
    )
}