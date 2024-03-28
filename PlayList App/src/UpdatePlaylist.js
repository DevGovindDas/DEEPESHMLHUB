import { useState } from "react";
import { SongUpdateForm } from "./SongUpdateForm";

export function UpdatePlaylist({ id, playlistArray, setPlaylistArray }) {
  const [playlistName, setPlaylistName] = useState(playlistArray.filter((pl) => pl.id === id)[0].playlistName);
  function handleOnSubmit(e) {
    e.preventDefault();
    setPlaylistArray((pa) => pa.map((ob) => ob.id === id ? { ...playlistArray.filter((pl) => pl.id === id)[0], playlistName: playlistName } : ob));
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h5 style={{ margin: "auto" }}>
        Press enter after editing any field to save the details
        <form onSubmit={handleOnSubmit}>
        <label htmlFor="playN">Playlist Name</label>
        <input id="playN" type="text" value={playlistName} placeholder="Playlist Name" onChange={(e) => {
          setPlaylistName(e.target.value);
        }} /></form>
      </h5>
      <hr></hr>
      <table>
        <thead>
          <th>Track Name</th>
          <th>Track Artist</th>
          <th>Track Album</th>
          <th>Track Genere</th>
          <th>Track Release Date</th>
          <th>Track Duration</th>
        </thead>
        <tbody>
          {playlistArray.filter((pl) => pl.id === id)[0].songs.map((song) => (
            <tr key={song.trackId}>
              <SongUpdateForm song={song} id={id} playlistArray={playlistArray} setPlaylistArray={setPlaylistArray} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
