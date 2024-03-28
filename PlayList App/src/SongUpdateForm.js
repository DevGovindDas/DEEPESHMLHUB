import { useState } from "react";

export function SongUpdateForm({ song, id, playlistArray, setPlaylistArray }) {
  const [trackName, setTrackName] = useState(song.trackName);
  const [trackArtist, setTrackArtist] = useState(song.trackArtist);
  const [trackAlbum, setTrackAlbum] = useState(song.trackAlbum);
  const [trackGenere, setTrackGenere] = useState(song.trackGenere);
  const [trackRDate, setTrackRDate] = useState(song.trackRDate);
  const [trackDuration, setTrackDuration] = useState(song.trackDuration);
  function handleOnSubmit(e) {
    e.preventDefault();
    const activePlaylist = playlistArray.filter((pl) => pl.id === id)[0];

    setPlaylistArray(playlistArray.slice().map((ob) => ob.id === id ? {
      ...activePlaylist, songs: activePlaylist.songs.map((s) => s.trackId === song.trackId ? {
        trackId: s.trackId,
        trackName: trackName,
        trackDuration: trackDuration,
        trackGenere: trackGenere,
        trackArtist: trackArtist,
        trackAlbum: trackAlbum,
        trackRDate: trackRDate
      } : s)
    } : ob));
    console.log(playlistArray);
  }

  function handleOnDelete() {
    const activePlaylist = playlistArray.filter((pl) => pl.id === id)[0];
    setPlaylistArray(playlistArray.map((ob) => ob.id === id ? { ...playlistArray.filter((pl) => pl.id === id)[0], songs: activePlaylist.songs.filter((s) => s.trackId !== song.trackId) } : ob));
  }
  return (
    <>
      <td>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="Track Name"
            value={trackName}
            onChange={(e) => setTrackName(e.target.value)} />
        </form>
      </td>
      <td>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="Track Duration"
            value={trackDuration}
            onChange={(e) => setTrackDuration(e.target.value)} />
        </form>
      </td>
      <td>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="Track Genere"
            value={trackGenere}
            onChange={(e) => setTrackGenere(e.target.value)} />
        </form>
      </td>
      <td>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="Track Artist"
            value={trackArtist}
            onChange={(e) => setTrackArtist(e.target.value)} />
        </form>
      </td>
      <td>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="Track Album"
            value={trackAlbum}
            onChange={(e) => setTrackAlbum(e.target.value)} />
        </form>
      </td>
      <td>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="Track Year"
            value={trackRDate}
            onChange={(e) => setTrackRDate(e.target.value)} />
        </form>
      </td>
      <td>
        <button onClick={handleOnDelete}>Delete</button>
      </td>

    </>
  );
}
