import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "./components/Login4.jsx";
import Home from "./components/Home.jsx";
import "./components/styles/login4.css";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
