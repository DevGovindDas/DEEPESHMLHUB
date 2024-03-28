import { useState } from "react";

export function AddSong({ id, handleAddSong }) {
  const [trackName, setTrackName] = useState("");
  const [trackDuration, setTrackDuration] = useState("");
  const [trackGenere, setTrackGenere] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  const [trackAlbum, setTrackAlbum] = useState("");
  const [trackRDate, setTrackRDate] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const newSong = {
      trackId:Date.now(),
      trackName: trackName,
      trackDuration: trackDuration,
      trackGenere: trackGenere,
      trackArtist: trackArtist,
      trackAlbum: trackAlbum,
      trackRDate: trackRDate
    };
    handleAddSong(id, newSong);

  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ margin: "auto" }}>
        <form onSubmit={handleSubmit}>
          <table>
            <thead><th style={{ textDecoration: "underline" }}>PLease enter the Track details<br></br><br></br></th></thead>
            <tr>
              <td>
                <label htmlFor="name">Enter Track Name</label>
              </td>
              <td>
                <input
                  type="text"
                  id="name"
                  placeholder="Track Name"
                  value={trackName}
                  onChange={(e) => setTrackName(e.target.value)} />
              </td>
              <td>
                <label htmlFor="duration">Enter Track Duratione</label>
              </td>
              <td>
                <input
                  type="text"
                  id="duration"
                  placeholder="Track Duration"
                  value={trackDuration}
                  onChange={(e) => setTrackDuration(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="genere">Enter Track Genere</label>
              </td>
              <td>
                <input
                  type="text"
                  id="genere"
                  placeholder="Track Genere"
                  value={trackGenere}
                  onChange={(e) => setTrackGenere(e.target.value)} />
              </td>
              <td>
                <label htmlFor="artist">Enter Track Artist</label>
              </td>
              <td>
                <input
                  type="text"
                  id="artist"
                  placeholder="Track Artist"
                  value={trackArtist}
                  onChange={(e) => setTrackArtist(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="album">Enter Track Album</label>
              </td>
              <td>
                <input
                  type="text"
                  id="album"
                  placeholder="Track Album"
                  value={trackAlbum}
                  onChange={(e) => setTrackAlbum(e.target.value)} />
              </td>
              <td>
                <label htmlFor="date">Enter Track Release Year</label>
              </td>
              <td>
                <input
                  type="text"
                  id="date"
                  placeholder="Track Year"
                  value={trackRDate}
                  onChange={(e) => setTrackRDate(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <input type="submit" value={'Submit'} />
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
}
