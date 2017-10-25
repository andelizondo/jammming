import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input
          placeholder="Playlist name"
          value={this.props.playlistName}
          onChange={this.handleNameChange}/>
        <TrackList
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true} />
        {(this.props.playlistName && this.props.playlistTracks.length !== 0) ?
          <a className="Playlist-save" onClick={this.props.onSave}>
            SAVE TO SPOTIFY
          </a> :
          <h4>Add a name and tracks!</h4>
        }
      </div>
    );
  }
}
export default Playlist;
