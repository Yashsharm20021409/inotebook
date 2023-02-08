import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <>
      <NoteState>
        {/* <h1>This is inotebook</h1> */}
        <Router>
          <Navbar />
          <Alert message = "Success: Done"/>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route exact path='/about' element={<About />}></Route>
              <Route exact path='/login' element={<Login/>}></Route>
              <Route exact path='/signup' element={<SignUp/>}></Route>
              {/* <Route exact path='/' element={<Home/>}></Route> */}
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
