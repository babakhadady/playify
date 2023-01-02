
import { Button, Container, Form, Col, Row, InputGroup, ListGroup } from 'react-bootstrap';


function Playlist({ stateChanger, artists, token }) {
    const searchURL = 'https://api.spotify.com/v1/search'
    const searchPar = {
        headers: {
            'Content-Type' : 'application/json',
             'Authorization' : 'Bearer' + token
        }
    }


    // api call to grab artists id for each artist
    function grabArtists() {
        artists.map((artist, index) => {

        });
    }

    function grabArtist(artist) {


    }

    return (



        <div>
            <Button variant="danger" onClick={() => stateChanger(true)}>Return to Search</Button>

        </div>

    );
}

export default Playlist