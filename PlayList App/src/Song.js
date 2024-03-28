export function Song({ song }) {
  return (
    <div>
      Track Name:{song.trackName} | Track Artist:{song.trackArtist} | Track Album:{song.trackAlbum} | Track Genere:{song.trackGenere} | Track RDate:{song.trackRDate} | Track Duration:{song.trackDuration}
    </div>
  );
}
