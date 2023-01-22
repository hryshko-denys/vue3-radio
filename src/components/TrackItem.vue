<script lang="ts" setup>
import { toRef } from "vue";

import { TrackItemWithAlbumInt } from "../types/TrackTypes";
import Progress from "./Progress.vue";
import { useTrack } from "../composables/useTrack";

interface TrackItemProp {
  song: TrackItemWithAlbumInt;
  isActive?: boolean;
}

const props = defineProps<TrackItemProp>();
const song = toRef(props, "song");

const {
  adaptedTime,
  adaptedDuration,
  image,
  songProgress,
  adaptedTimeInSeconds,
  setAltImg,
} = useTrack(song);
</script>

<template>
  <div class="track">
    <div class="track__title">{{ song.title }}</div>
    <div class="track__artist">{{ song.artist }}</div>
    <div class="track__image-wrapper">
      <img
        :src="image"
        @error="setAltImg"
        alt="Song image"
        :class="['track__image', { 'track__image--active': isActive }]"
      />
    </div>
    <div class="track__duration">Duration: {{ adaptedDuration }}</div>
    <div class="track__time">Start time: {{ adaptedTime }}</div>
    <div v-if="song.album" class="track__album">Album: {{ song.album }}</div>
    <Progress
      v-if="isActive"
      :adaptedTimeInSeconds="adaptedTimeInSeconds"
      :songProgress="songProgress"
    />
  </div>
</template>

<style scoped>
.track {
  min-height: 450px;
  width: min-content;
  padding: 10px 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  box-shadow: 0px 2px 10px rgb(0 0 0 / 60%);
  position: relative;
}

.track .track__title {
  margin-bottom: 5px;

  font-size: 22px;
  text-align: center;
  font-weight: bold;
}

.track .track__artist {
  margin-bottom: 15px;

  font-size: 18px;
  text-align: center;
  text-decoration: underline;
}

.track .track__image-wrapper {
  margin-bottom: 5px;
  width: 100%;
  max-height: 500px;
}

.track .track__image {
  max-width: 250px;
  max-height: 250px;

  background-size: cover;
}
.track .track__album {
  text-align: center;
}

.track .track__image--active {
  max-width: 400px;
  max-height: 400px;

  background-size: cover;
}

@media screen and (max-width: 860px) {
  .track .track__image--active {
    max-width: 320px;
  }
}
</style>
