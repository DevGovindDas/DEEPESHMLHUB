import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function App() {
  const [playlistArray, setPlaylistArray] = useState([]);

  function handleAddPlaylist(playlist) {
    setPlaylistArray((playlistArray) => [...playlistArray, playlist]);
    console.log(playlistArray, "New Array");
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
                handleAddPlaylist={handleAddPlaylist}
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
          <Route exact path="/addSong" Component={AddSong} />
        </Routes>
      </div>
    </Router>
  );
}

function Home({ playlistArray }) {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1
        style={{
          textAlign: "center",
          color: "green",
          textDecoration: "underline",
          border: "1px solid black",
        }}
      >
        Welcome to your Favourite Music Player
      </h1>
      <h3
        style={{
          color: "black",
          textDecoration: "underline",
        }}
      >
        Please Choose one of the options below
      </h3>
      <br></br>
      <table
        style={{
          width: "100%",
        }}
      >
        <tr>
          <td style={{ width: "50%" }}>
            <h4
              style={{
                color: "black",
                textDecoration: "underline",
              }}
            >
              Select the playlist to Edit
            </h4>
            <ul style={{ border: "1px solid black" }}>
              {playlistArray.map((item) => (
                <li key={item.id}>
                  <Link to="/addSong">{`${item.playlistName}`}</Link>
                  <button
                    onClick={() => {
                      navigate("/addSong", {
                        id: item.id,
                        playlistArray: playlistArray,
                      });
                    }}
                  >
                    Add Song
                  </button>
                </li>
              ))}
            </ul>
          </td>
          <td style={{ width: "50%" }}>
            <Link
              to="/addPlaylist"
              style={{ color: "black" }}
              className="btn btn-success"
            >
              Add a Playlist
            </Link>
          </td>
        </tr>
      </table>
    </div>
  );
}

function AddPlayList({ handleAddPlaylist }) {
  const [playlistName, setPlaylistName] = useState(null);

  function handleOnSubmit(e) {
    e.preventDefault();
    let x = {
      id: Date.now(),
      playlistName: playlistName,
    };
    console.log(x);
    handleAddPlaylist(x);
  }

  return (
    <div style={{ textAlign: "center", verticalAlign: "center" }}>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="name">Enter the name of the PlayList</label>
        <input
          type="text"
          id="name"
          placeholder="Playlist Name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
      </form>
    </div>
  );
}
function AddSong(id, playlistArray) {
  const [trackName, setTrackName] = useState("");
  const [trackDuration, setTrackDuration] = useState("");
  const [trackGenere, setTrackGenere] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  const [trackAlbum, setTrackAlbum] = useState("");
  const [trackRDate, setTrackRDate] = useState("");
  function handleOnSubmit(e) {}
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="name">Enter Track Name</label>
        <input
          type="text"
          id="name"
          placeholder="Track Name"
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
        />
        <label htmlFor="duration">Enter Track Duratione</label>
        <input
          type="text"
          id="duration"
          placeholder="Track Duration"
          value={trackDuration}
          onChange={(e) => setTrackDuration(e.target.value)}
        />
        <label htmlFor="genere">Enter Track Genere</label>
        <input
          type="text"
          id="genere"
          placeholder="Track Genere"
          value={trackGenere}
          onChange={(e) => setTrackGenere(e.target.value)}
        />
        <label htmlFor="artist">Enter Track Artist</label>
        <input
          type="text"
          id="artist"
          placeholder="Track Artist"
          value={trackArtist}
          onChange={(e) => setTrackArtist(e.target.value)}
        />
        <label htmlFor="album">Enter Track Album</label>
        <input
          type="text"
          id="album"
          placeholder="Track Album"
          value={trackAlbum}
          onChange={(e) => setTrackAlbum(e.target.value)}
        />
        <label htmlFor="date">Enter Track Release Year</label>
        <input
          type="text"
          id="date"
          placeholder="Track Year"
          value={trackRDate}
          onChange={(e) => setTrackRDate(e.target.value)}
        />
      </form>
    </div>
  );
}
