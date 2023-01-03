
import { Button, ListGroup, Form, Col, Row, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import '../App.css'


function Playlist({ stateChanger, artists, token, loggedIn }) {

    const [artistObjects, setArtistsObjects] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState("");
    const [field, setField] = useState("");
    const [started, setStarted] = useState(false);
    const [errorFound, setError] = useState("");
    const [playlist, setPlaylist] = useState(undefined);

    async function createPlaylist() {
        console.log(tracks)
        const trackURIs = "uris=" + tracks.map((track, i) => {
            return track.uri;
        })

        const playlistDescription = "Playlist Containing:" + artistObjects.map((artist, i) => {
            return " " + artist.name
        })

        const userID = loggedIn.id
        console.log(userID)

        const name = playlistName || "Playlist Generated from playify"

        const p = await fetch('https://api.spotify.com/v1/users/' + userID + '/playlists', {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${token} `,
                'Accept': "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "description": playlistDescription,
                "public": "false",
            }),
            json: "true"
        }).then(response => response.json()).then(data => {
            return data;
        });

        setPlaylist(p)
        console.log(p)


        const wait2 = await fetch('https://api.spotify.com/v1/playlists/' + p.id + '/tracks?' + trackURIs, {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${token} `,
                'Accept': "application/json",
                'Content-Type': 'application/json',
            },
        }).then(response => response.json()).then(data => {
            console.log(data)
        });

    }

    const searchPar = {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token} `,
            'Accept': "application/json",
            'Content-Type': 'application/json',
        },
    }



    useEffect(() => {
        if (artistObjects.length === artists.length) {
            if (started) return;

            setStarted(true);
            console.log("STARTED TRACKS")
            artistObjects.forEach((a, index) => {
                console.log("STARTED" + a.name);
                grabTracks(a)
            })
        }


    }, [artistObjects])

    useEffect(() => {
        if (artistObjects.length !== 0) return;
        console.log("RAN")
        artists.map((a, index) => {
            grabArtist(a)
        })

    }, [])

    // api call to grab artists id for each artist



    async function grabArtist(artist) {

        fetch('https://api.spotify.com/v1/search?q=' + artist + '&type=artist', searchPar)
            .then(response => response.json()).then(data => {
                let temp = data.artists.items[0]
                if (temp === undefined) {
                    setError(artist);
                    return;
                }
                setArtistsObjects(prevState => [...prevState, temp]);
            })
    }

    const displayArtists = artistObjects.map((artist, i) => {
        return <ListGroup.Item key={i}>{artist.name}</ListGroup.Item>
    })

    async function grabTracks(artist) {
        fetch('https://api.spotify.com/v1/artists/' + artist.id + '/top-tracks?market=CA', searchPar)
            .then(response => response.json()).then(data => {
                data.tracks.map((track, index) => {
                    setTracks(prevState => [...prevState, track]);
                })
            })
    }

    const displayTracks = tracks.map((track, i) => {
        return <ListGroup.Item key={track.name}>{track.name} by {track.artists[0].name}</ListGroup.Item>
    })

    const PlaylistName = (event) => {
        event.preventDefault();
        if (field === "") return;
        setPlaylistName(field);
        console.log(field);
    }

    return (
        <Container>
            <div className='d-flex flex-dir justify-content-center'>
                {errorFound === "" ? <div className='flexbox'>
                    <Col>
                        <div className='d-inline justify-content-center flex-dir'>
                            <p className='mt-5'>
                                Artists Found:
                            </p>
                            <ListGroup className='mb-5'>
                                {displayArtists}
                            </ListGroup>



                            <p className='mb-3'>
                                Selected Tracks:
                            </p>
                            <ListGroup className="mb-5">
                                {displayTracks}
                            </ListGroup>

                        </div>

                    </Col>

                    <Col>
                        <div>
                            <div className='form-container mt-5'>
                                <Form className=" d-flex justify-content-center" onSubmit={PlaylistName}>
                                    <Form.Group className=" mt-5 d-flex mb-3 justify-content-center" controlId="formBasicEmail">
                                        <Col xs="8" className="">
                                            <Row >
                                                <Form.Label >Generated Playlist Name</Form.Label>   {/* NAME */}
                                                <div className="d-flex flexbox">
                                                    <Form.Control type="input" placeholder="Playlist Name" onChange={event => setField(event.target.value)} />
                                                    <Button className="button2 " variant="dark" type="submit"> Select  </Button>
                                                </div>
                                                <Form.Text className="text-muted">  Entered name will be used upon playlist creation </Form.Text>
                                            </Row>
                                        </Col>
                                    </Form.Group>
                                </Form>
                                <div className='d-flex flex-dir justify-content-center align-items-center'>
                                    <Col>
                                        {(playlist === undefined) ? <Button className="mb-3" variant="success" onClick={() => createPlaylist()}> Generate Playlist</Button>
                                            : <Button className="mb-3" variant="success" href={playlist.external_urls.spotify}>View Playlist</Button>}

                                    </Col>

                                    <Col>
                                        <Button variant="danger" onClick={() => stateChanger(true)}>Return to Search</Button>
                                    </Col>
                                </div>
                            </div>
                        </div>
                    </Col>

                </div> :
                    <div className="d-flex flex-dir justify-content-center align-items-center">
                        <p>{errorFound} not found  please delete it 😢 </p>
                        <Button variant="danger" onClick={() => stateChanger(true)}>Return to Search</Button>
                    </div>}
            </div>
        </Container>

    );
}

export default Playlist