import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import Mockman from 'mockman-js';
import { Routes } from "./route/AppRoute";
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
        <Routes />
    </div>
  );
}

export default App;
