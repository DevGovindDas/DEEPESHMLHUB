import { PlayListOperations } from "./PlayListOperations";

export function Home({ playlistArray, handleAddSong, setPlaylistId, handleDeletePlaylist }) {

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
        {playlistArray.length===0?`${'Please Add atleast one playlist to see the details below'}`: `${'Please Choose one of the options below'}`}
      </h3>
      <br></br>
      <table
        style={{
          width: "100%",
        }} border="1"
      ><tbody>
        {playlistArray.map(
          (item) => (<PlayListOperations item={item} handleAddSong={handleAddSong} playlistArray={playlistArray} handleDeletePlaylist={handleDeletePlaylist} setPlaylistId={setPlaylistId} key={item.id}/>
            ))}
            </tbody>
      </table>
    </div>
  );
}

