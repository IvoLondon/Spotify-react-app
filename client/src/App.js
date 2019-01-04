import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Spotify from 'spotify-web-api-js'


const spotifyApi = new Spotify();

class App extends Component {

  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;

    if(token) {
      spotifyApi.setAccessToken(token);
    }

    this.state = {
      loggedIn : token ? true : false,
      nowPlaying : {
        songName : '',
        songImg : '',
      }
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        console.log(response);
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="http://localhost:8898"
            target="_blank"
            rel="noopener noreferrer"
          >
            Login to Spotify
          </a>
          { this.state.loggedIn ? 
            <button onClick={this.getNowPlaying}>Check whats playing</button>
          : null }
        </header>
      </div>
    );
  }
}

export default App;
