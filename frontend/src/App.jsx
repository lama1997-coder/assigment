import logo from './logo.svg';
import './App.css';
import Login from './pages/Login.jsx';
import Register from './pages/Registration.jsx';
import UploadPage from './pages/UploadPage.jsx'

import { BrowserRouter, Routes, Route } from "react-router";



 function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}>
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />  */}
        </Route>
        <Route  path="/register" index element={<Register />} />
        <Route  path="/files" index element={<UploadPage />} />


      </Routes>
    </BrowserRouter>
  );
}
// function App() {
//   return (
   
//      <Login/>
//   );
// }

export default App;
