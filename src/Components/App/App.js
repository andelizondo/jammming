import React from 'react';
import './App.css';
import Spotify from '../../util/Spotify';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

const defaultState = {
  searchResults: [],
  playlistName: '',
  playlistTracks: [],
  isCreated: false
};

class App extends React.Component {
  constructor(props) {
    super(props);

    // Initial App State
    this.state = defaultState;

    // Binding Methods
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    // Initializes Spotify
    Spotify.getAccessToken();
  }

  addTrack(track) {
    const trackExists = this.state.playlistTracks.some(playlistTrack =>
      playlistTrack.id === track.id
    );
    if (!trackExists) {
      this.setState({
        playlistTracks: this.state.playlistTracks.concat([track])
      });
    }
  }

  removeTrack(track) {
    const newPlaylistTracks = this.state.playlistTracks.filter(playlistTrack =>
      playlistTrack.id !== track.id
    );
    this.setState({
      playlistTracks: newPlaylistTracks
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
      isCreated: false
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState(defaultState);
      this.setState({
        isCreated: true
      });
    });
  }

  search(searchTerm) {
    if (searchTerm) {
      Spotify.search(searchTerm).then(foundTracks => {
        this.setState({
          searchResults: foundTracks,
          isCreated: false
        });
      });
    }
    else {
      this.setState({
        searchResults: [],
        isCreated: false
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing!</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
          {this.state.isCreated &&
            <div className="playlist-success">Playlist Successfully Created!</div>}
        </div>
      </div>
    );
  }
}
export default App;
