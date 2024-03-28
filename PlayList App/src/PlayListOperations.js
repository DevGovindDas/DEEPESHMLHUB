import { useNavigate } from "react-router-dom";

export function PlayListOperations({ item, handleAddSong, playlistArray, handleDeletePlaylist, setPlaylistId }) {
  const navigate = useNavigate();
  return (
    <>
      <tr style={{ width: "100%" }}>
        <td style={{ width: "20%", border: "1" }}>
          {item.playlistName}
        </td>

        <td style={{ width: "20%" }}>
          <button
            onClick={() => {
              setPlaylistId(() => item.id);
              navigate("/addSong", {
                id: item.id,
                handleAddSong: { handleAddSong }
              });
            }}
          >
            Add Song
          </button>
        </td>

        <td style={{ width: "20%" }}>
          <button
            onClick={() => {
              setPlaylistId(() => item.id);
              navigate("/playlistDetails", {
                id: item.id,
                handleAddSong: { handleAddSong }
              });
            }}
          >
            PlayList Details
          </button>
        </td>
        <td style={{ width: "20%" }}>
          <button
            onClick={() => {
              setPlaylistId(() => item.id);
              navigate("/updatePlaylist", {
                id: item.id,
                playlistArray: { playlistArray }
              });
            }}
          >
            Update Playlist
          </button>
        </td>
        <td style={{ width: "20%" }}>
          <button
            onClick={() => handleDeletePlaylist(item.id)}
          >
            Delete Playlist
          </button>
        </td>
      </tr>
    </>
  );
}
