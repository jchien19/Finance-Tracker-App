import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Settings from './pages/Settings';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
            <Routes>
              <Route path="/home" element = {<Home/>} />
              <Route path="/" element = {<Login />} />
              <Route path="/register" element = {<Register />} />
              <Route path="/settings" element = {<Settings />} />
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
