import { Button, Form, Col, Row, ListGroup } from 'react-bootstrap';
import '../App.css'
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import { useNavigate } from "react-router-dom";
import queryString from 'query-string';



function Search({ stateChanger, artists, setArtists, setToken, setLoggedIn, loggedIn }) {
    const [input, setInput] = useState("");
    const history = useNavigate();

    useEffect(() => {
        const params = queryString.parse(window.location.search);
        const token = params.token;
        console.log(params.token);
        history('/');

        if (token) {
            setToken(token);
            console.log(token);
            fetch('https://api.spotify.com/v1/me',
                {
                    url: 'https://api.spotify.com/v1/me',
                    method: 'GET',
                    headers: {
                        'Accept': "application/json",
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token} `,
                    },
                }).then(response => response.json()).then(data => setLoggedIn(data));
        }
    }, [])

    // can remove
    useEffect(() => {
        console.log(artists);
        console.log(loggedIn);
    }, [artists]);

    // spotify login
    function login() {
        window.location = ('http://localhost:8888/authorization');
    }

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
            <h5 className='mb-3 '>Playify curates Spotify playlists to your music taste effortlessly </h5>

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

            <div className='mt-2'>
                {(artists.length === 0) ? null : <Form.Text > Click on a selected artist to remove</Form.Text>}
            </div>

            <div className='d-flex flexbox'>
                {(loggedIn !== "") ?
                    <div className=''>
                        <Button className='mt-3 mb-1 mx-2' variant="success" disabled>
                            Login to Spotify
                        </Button>
                            {(artists.length === 0) ?
                                <Button className='mt-3 mb-1 mx-2' variant="success" disabled onClick={() => { stateChanger(false) }}>
                                    Generate Playlist
                                </Button> :
                                <Button className='mt-3 mb-1 mx-2' variant="success" onClick={() => { stateChanger(false) }}>
                                    Generate Playlist
                                </Button>}
                    </div> :
                    <Button className='mt-3 mb-1' variant="success" active onClick={login}>
                        Login to Spotify
                    </Button>}
            </div>
            <div className='login'>
                {(loggedIn === "") ? null : <Form.Text> Logged in as {loggedIn.display_name}</Form.Text>}
            </div>
        </div >
    );
}


export default Search;