import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
      <NoteState>
        {/* <h1>This is inotebook</h1> */}
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route exact path='/about' element={<About />}></Route>
              {/* <Route exact path='/' element={<Home/>}></Route> */}
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
