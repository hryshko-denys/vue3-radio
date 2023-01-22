import { ref } from "vue";

import { fetchSongs, findSongAlbum, findSongsAlbum } from "../utils/fetch";

import { TrackItemInt, TrackItemWithAlbumInt } from "../types/TrackTypes";
import { ACTIVE_SONG_STATUS } from "../utils/constants";

export function useFetchRadioList() {
  const historyList = ref<null | TrackItemWithAlbumInt[]>(null);
  const playingSong = ref<null | TrackItemWithAlbumInt>(null);
  const isFirstListLoaded = ref(false);

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

      historyList.value.unshift(playingSong.value);
      playingSong.value = { album: newPlayingSongAlbum, ...newPlayingSong };
    }
  };

  return {
    isFirstListLoaded,
    playingSong,
    historyList,
    updateSongs,
  };
}
