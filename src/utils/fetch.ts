import { SongInfoInt, TrackItemInt } from "../types/TrackTypes";

// let headers = new Headers();
// //
// headers.append("Content-Type", "application/json");
// headers.append("Accept", "application/json");
// headers.append("Origin", "http://localhost:5173");
// headers.append("Access-Control-Allow-Origin", "*");

export const fetchSongs = async () => {
  const response = await fetch(import.meta.env.VITE_RADIO_SONGS_API, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();

  return responseData?.nowplaying;
};

export const findSongAlbum = async (songInfo: TrackItemInt) => {
  const titleParams = songInfo.title
    .replaceAll(" ", "+")
    .replaceAll(/[^a-zA-Z0-9]/g, "");
  const searchParams = titleParams;
  const songResponse = await fetch(
    `${import.meta.env.VITE_APPLE_SONGS_API}${searchParams}`,
    { method: "GET", mode: "no-cors" }
  );
  const songData = await songResponse.json();

  if (songData.results?.length > 0) {
    const correctSongData = songData.results.find(
      (songData: SongInfoInt) => songData.artistName === songInfo.artist
    );

    return correctSongData?.collectionName || null;
  }
};

export const findSongsAlbum = async (songs: TrackItemInt[]) => {
  const songsList = await Promise.all(
    songs.map(async (songInfo: TrackItemInt) => {
      let album = await findSongAlbum(songInfo);

      return { ...songInfo, album };
    })
  );

  return songsList;
};
