import { ref } from "vue";

import { TrackItemInt, TrackItemWithAlbumInt } from "../types/TrackTypes";

import { fetchSongs, findSongAlbum, findSongsAlbum } from "../utils/fetch";
import { ACTIVE_SONG_STATUS, REQUEST_DELAY_TIME } from "../utils/constants";

const historyList = ref<null | TrackItemWithAlbumInt[]>(null);
const playingSong = ref<null | TrackItemWithAlbumInt>(null);
const isFirstListLoaded = ref(false);

export function useFetchRadioList() {
  const updateActiveSong = (
    newPlayingSongAlbum: null | string,
    newPlayingSong: TrackItemInt
  ) => (playingSong.value = { album: newPlayingSongAlbum, ...newPlayingSong });

  const moveSongToHistory = (song: TrackItemWithAlbumInt) => {
    if (historyList.value) {
      historyList.value.unshift(song);
    }
  };
  const updateSongs = async () => {
    let songs = await fetchSongs();

    const isFirstSongFetch = playingSong.value === null;
    const newPlayingSong = songs.find(
      (song: TrackItemInt) => song.status === ACTIVE_SONG_STATUS
    );

    if (isFirstSongFetch) {
      songs = await findSongsAlbum(songs);

      historyList.value = songs.filter(
        (song: TrackItemWithAlbumInt) => song.status !== ACTIVE_SONG_STATUS
      );

      playingSong.value = newPlayingSong;
      isFirstListLoaded.value = true;

      return;
    }

    const isPlayingSongNew = newPlayingSong.title !== playingSong.value?.title;

    if (isPlayingSongNew && historyList.value && playingSong.value) {
      const newPlayingSongAlbum = await findSongAlbum(newPlayingSong);

      moveSongToHistory(playingSong.value);
      updateActiveSong(newPlayingSongAlbum, newPlayingSong);
    }
  };

  function requestSongs() {
    const delay = new Promise((resolve) =>
      setTimeout(resolve, REQUEST_DELAY_TIME)
    );
    Promise.all([updateSongs(), delay]).then(() => {
      requestSongs();
    });
  }

  return {
    isFirstListLoaded,
    playingSong,
    historyList,
    updateSongs,
    requestSongs,
  };
}
