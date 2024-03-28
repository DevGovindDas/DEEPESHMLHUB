import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AddPlayList } from "./AddPlayList";
import { AddSong } from "./AddSong";
import { Home } from "./Home";
import { PlayListDetails } from "./PlayListDetails";
import { UpdatePlaylist } from "./UpdatePlaylist";
export default function App() {
  const [playlistArray, setPlaylistArray] = useState([]);
  const [playlistId, setPlaylistId] = useState('');

  function handleAddPlaylist(playlist) {
    setPlaylistArray((playlistArray) => [...playlistArray, playlist]);
    console.log(playlistArray, "New Array");
  }

  function handleAddSong(id, song) {
    setPlaylistArray((playlistArray) => playlistArray.map((playlist) => playlist.id === id ? { ...playlist, songs: [...playlist.songs, song] } : playlist));
    console.log(playlistArray, 'This is the updated playlist array');
  }

  function handleDeletePlaylist(id) {
    setPlaylistArray((array) => array.filter((arr) => arr.id !== id));
  }
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route
            path="/"
            Component={() => (
              <Home
                playlistArray={playlistArray}
                handleAddSong={handleAddSong}
                setPlaylistId={setPlaylistId}
                handleDeletePlaylist={handleDeletePlaylist}
              />
            )}
          />
          <Route
            exact
            path="/addPlaylist"
            Component={() => (
              <AddPlayList handleAddPlaylist={handleAddPlaylist} />
            )}
          />
          <Route
            exact
            path="/addSong"
            Component={() => (
              <AddSong id={playlistId} handleAddSong={handleAddSong} />
            )}
          />
          <Route
            exact
            path="/playlistDetails"
            Component={() => (
              <PlayListDetails id={playlistId} playlistArray={playlistArray} />
            )}
          />
          <Route
            exact
            path="/updatePlaylist"
            Component={() => (
              <UpdatePlaylist id={playlistId} playlistArray={playlistArray} setPlaylistArray={setPlaylistArray} />
            )}
          />
        </Routes>
      </div>
    </Router>
  );
}



