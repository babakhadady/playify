import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Col, Row, InputGroup, ListGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Search from './Components/Search';
import Playlist from './Components/Playlist';


const CLIENT_ID= ""
const token_url = ""


const redirectURI =  'http://localhost:3000/playify'


function App() {

  const [artists, setArtists] = useState([]);
  const [token, setToken] = useState("");

  // API Access Token
  useEffect(() => {
 

   
  }, []);

  const [shouldShow, setShow] = useState(true);

  return (

    <div className='d-flex main-container'>

      <h1 className='fw-bold mb-3 header'> playify</h1>

      <div>
        {shouldShow ?
          <Search stateChanger={setShow} artists={artists} setArtists={setArtists} /> :
          <Playlist stateChanger={setShow} artists={artists} token={token} />}
      </div>


    </div>


  );
}

export default App;
