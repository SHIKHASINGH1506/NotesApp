import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from './Pages';
import { Home} from "./Pages/index";
import { Navbar } from "./component";
import Mockman from 'mockman-js';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/mockman' element={<Mockman />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
