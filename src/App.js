import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {useState} from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };
  return (
    <>
      <NoteState>
        {/* <h1>This is inotebook</h1> */}
        <Router>
          <Navbar />
          <Alert alert = {alert}/>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home showAlert={showAlert} />}></Route>
              <Route exact path='/about' element={<About />}></Route>
              <Route exact path='/login' element={<Login showAlert={showAlert}/>}></Route>
              <Route exact path='/signup' element={<SignUp showAlert={showAlert}/>}></Route>
              {/* <Route exact path='/' element={<Home/>}></Route> */}
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
