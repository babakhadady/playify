import { Button, Container, Form, Col, Row, InputGroup, ListGroup } from 'react-bootstrap';
import '../App.css'
import { useState, useEffect } from 'react';
import App from '../App';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';


function Search({ stateChanger, artists, setArtists }) {

    const [input, setInput] = useState("");

    // can remove
    useEffect(() => {
        console.log(artists);
    }, [artists]);

    const addArtist = (event) => {
        event.preventDefault();
        if (input === "") return;
        if (artists.includes(input)) return;
        setArtists(prevState => [...prevState, input]);
    }

    const removeArtist = (index) => {
        setArtists([
            ...artists.slice(0, index),
            ...artists.slice(index + 1)
        ])
    };

    // artist display
    const displayArtists = artists.map((item, i) =>
        <ListGroup.Item key={item} action
            onClick={() => removeArtist(i)} >{item}
        </ListGroup.Item>);



    return (
        <div className='d-flex main-container'>
            <h5 className='mb-5 '>Playify curates Spotify playlists to your music taste effortlessly </h5>
            <div className='form-container'>


                <Form className="mx-5 d-flex justify-content-center" onSubmit={addArtist}>


                    <Form.Group className=" d-flex mb-3 justify-content-center" controlId="formBasicEmail">
                        <Col xs="6" className="">
                            <Row >
                                <Form.Label >Search for an artist</Form.Label>   {/* NAME */}
                                <div className="d-flex flexbox">
                                    <Form.Control type="input" placeholder="Artist Name" onChange={event => setInput(event.target.value)} />
                                    <Button className="button2 " variant="dark" type="submit">Select  </Button>
                                </div>

                                <Form.Text className="text-muted">  Enter artist names to add to generated playlist </Form.Text>

                            </Row>
                        </Col>



                    </Form.Group>



                </Form>

            </div>
            <p> Selected Artists:</p>

            <ListGroup >
                {displayArtists}
            </ListGroup>

            <Button className='mt-3 mb-1' variant="success" onClick={() => { stateChanger(false) }}>
                Generate Playlist
            </Button>

            <Form.Text>
                Click on an artist in the list to delete it
            </Form.Text>
        </div >
    );
}


export default Search;