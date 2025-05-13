import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dahboard from './components/Dahboard';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login></Login>}></Route>
    <Route path="/signup" element={<Signup></Signup>}></Route>
    <Route path="/dashboard" element={<Dahboard></Dahboard>}></Route>
    <Route path="/tasks" element={<Dahboard></Dahboard>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
