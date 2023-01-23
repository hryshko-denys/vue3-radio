import { SongInfoInt, TrackItemInt } from "../types/TrackTypes";

export const fetchSongs = async () => {
  const response = await fetch("/getRadioSongs");
  const responseData = await response.json();

  return responseData?.nowplaying;
};

export const findSongAlbum = async (songInfo: TrackItemInt) => {
  const titleParams = songInfo.title
    .replaceAll(" ", "+")
    .replaceAll(/[^a-zA-Z0-9]/g, "");
  const searchParams = titleParams;

  const songResponse = await fetch(`/getSongAlbum${searchParams}`);
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
