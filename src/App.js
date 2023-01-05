import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Search from './Components/Search';
import Playlist from './Components/Playlist';
import { BrowserRouter } from 'react-router-dom';



function App() {
  const [loggedIn, setLoggedIn] = useState("");
  const [artists, setArtists] = useState([]);
  const [shouldShow, setShow] = useState(true);
  const [token, setToken] = useState("");

  return (

      <BrowserRouter>
        <div className='d-flex main-container'>
          <h1 className='fw-bold mb-3 header'> playify</h1>
          <div>
            {shouldShow ?
              <Search stateChanger={setShow} artists={artists} setArtists={setArtists} setToken={setToken} setLoggedIn={setLoggedIn} loggedIn={loggedIn} /> :
              <Playlist stateChanger={setShow} artists={artists} token={token} loggedIn={loggedIn} />}
          </div>
        </div>
      </BrowserRouter>

  );
}

export default App;
