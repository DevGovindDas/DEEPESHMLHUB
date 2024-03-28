import { useState } from "react";

export function AddPlayList({ handleAddPlaylist }) {
  const [playlistName, setPlaylistName] = useState(null);

  function handleOnSubmit(e) {
    e.preventDefault();
    let x = {
      id: Date.now(),
      playlistName: playlistName,
      songs: []
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
          onChange={(e) => setPlaylistName(e.target.value)} />
      </form>
    </div>
  );
}
