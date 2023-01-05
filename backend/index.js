const express = require('express')
const querystring = require('querystring')
const axios = require('axios');
require('dotenv').config();

const app = express()


const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:8888/callback'
const uri = process.env.FRONT_END_URI || 'http://localhost:3000'

// request authorization code
app.get('/authorization', function (req, res) {

    const authParam = {
        url: 'https://accounts.spotify.com/authorize?',
        method: 'GET',
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
        scope: 'playlist-modify-public playlist-modify-private user-read-email',
        response_type: 'code',
        show_dialog: true,
    }
    res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify(authParam));
})

// retrieve access token from authorization code
app.get('/callback', function (req, res) {
    let code = req.query.code || null
    let accessParam = {

        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        params: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(
                process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
            ).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        json: true
    }
    axios(accessParam).then(response => res.redirect(uri + '?token=' + response.data.access_token))

})

let port = process.env.PORT || 8888
console.log(`Listening on port ${port}. Go /authorization to initiate authentication flow.`)
app.listen(port)