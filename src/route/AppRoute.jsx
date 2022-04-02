import { Routes, Route } from "react-router-dom";
import { LandingPage, Home, Login, Signup, Trash } from "Pages";

const AppRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/trash' element={<Trash />} />
    </Routes>
  );
}
export { AppRoute as Routes };
