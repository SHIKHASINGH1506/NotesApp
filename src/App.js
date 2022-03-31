import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import Mockman from 'mockman-js';

import { LandingPage, Home, Login, Signup } from './Pages';
import { Navbar } from "./component";

function App() {
  return (
    <div className="App">
       <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/mockman' element={<Mockman />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
