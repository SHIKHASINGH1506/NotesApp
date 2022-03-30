import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from './Pages';
import { Home} from "./Pages/index";
import { Navbar } from "./component/index";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
