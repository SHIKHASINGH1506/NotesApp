import { Routes, Route } from "react-router-dom";
import { LandingPage, Home, Login, Signup, Trash, Archive } from "Pages";
import { ProtectedRoute } from "./ProtectedRoute";

const AppRoute = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/' element={<LandingPage />} />
      <Route path='/' element={<ProtectedRoute />} >
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/trash' element={<Trash />} />
        <Route path='/archive' element={<Archive />} />
      </Route>
    </Routes>
  );
}
export { AppRoute as Routes };
