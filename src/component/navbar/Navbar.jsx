import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from 'context';


export const Navbar = () => {
    const navigate = useNavigate();
    const {setAuth} = useAuth();
    const logoutUser = () => {
        setAuth({
            isAuth: false,
            token: '',
            user: {}
        });
        localStorage.clear();
        navigate('/');
    }
    const isAuth = localStorage.getItem("isAuth");
  return (
    <header className="navbar-home">
            <nav className="navbar-wrapper d-flex justify-between items-center">
                <div className="d-flex items-center w-50">
                    <svg
                        className="sidebar-toggler"
                        id="sidebar-toggler"
                        viewBox="0 0 100 40"
                        width="40"
                        height="40"
                        //onClick={() => sliderHandler()}
                    >
                        <rect width="60" height="10"></rect>
                        <rect y="20" width="60" height="10"></rect>
                        <rect y="40" width="60" height="10"></rect>
                    </svg>
                    <Link className="brand-logo mx-2" to="/">Noter</Link>
                </div>
               {isAuth && <div className="d-flex">
                    <LogoutIcon onClick={() => logoutUser()}/>
                </div>}
                <div className='sidebar-wrapper' id="sidebar-wrapper">
                    <div className='sidebar' id="sidebar">
                        <ul className="sidebar-list sidebar-collapse">
                            <li className="sidebar-item hide">
                                <Link className="sidebar-item-link profile-icon" to="#"><i className="fas fa-user"></i></Link>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-item-link" to="">Home</Link>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-item-link" to="">Labels</Link>
                            </li>
                            <li className="sidebar-item hide">
                                <Link className="sidebar-item-link" to="">Archieve</Link>
                            </li>
                            <li className="sidebar-item hide">
                                <Link className="sidebar-item-link" to="#">Trash</Link>
                            </li>
                            <li className="sidebar-item hide">
                                <Link className="sidebar-item-link" to="#">Profile</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
  )
}