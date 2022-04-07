import heroimg from "assets/hero-img.svg";
import './landing-page.css';
import { Link } from 'react-router-dom';
import {useAuth} from 'context';

export const LandingPage = () => {
  const {isAuth} = useAuth();
  return (
    <div className="landing-wrapper p-4">
      <div className="landing-content-wrapper d-flex justify-between ">
        <div className="hero-img-wrapper">
          <img src={heroimg} alt="" className="responsive-img" />
        </div>
        <div className="landing-content d-flex flex-col justify-between">
          <h1>Noter</h1>
          <div className="landing-content-body">
            <h4>Meet your modern <br /><span className="primary-txt">Note Taking App</span></h4>
            <p>Manage your daily tasks and workflow in a modern way and boost your efficiency without any efforts.</p>
          </div>
          <div className="landing-content-footer">
            <button className="bttn bttn-primary bttn-lg">
              <Link to='/home'>Start Now</Link>
            </button>
            {!isAuth && <p className="sub-text text-sm">Already have an account? 
              <Link className="text-sm bold link-text-primary" to='/login'>Login</Link>
            </p>}
          </div>
        </div>
      </div>
    </div>
  );
}