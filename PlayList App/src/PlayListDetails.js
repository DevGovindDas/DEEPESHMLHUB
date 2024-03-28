import { Song } from "./Song";

export function PlayListDetails({ id, playlistArray }) {
  return (<>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ margin: "auto" }}>
        <table>
          <thead>
            <th style={{ border: "1px solid black" }}>
              Play List Name:{`${playlistArray.filter((p) => p.id === id)[0].playlistName}`}
            </th>
          </thead>


          {playlistArray.filter((p) => p.id === id)[0].songs.map((song) => (<tr style={{ border: "1px solid black" }}><td style={{ border: "1px solid black" }}><Song song={song} key={song.trackName} /></td></tr>))}


        </table>
      </div>
    </div>
  </>);
}
