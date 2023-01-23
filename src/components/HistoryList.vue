<script lang="ts" setup>
import TrackItem from "./TrackItem.vue";

import { TrackItemWithAlbumInt } from "../types/TrackTypes";

interface HistoryListInt {
  songs: TrackItemWithAlbumInt[];
}

const props = defineProps<HistoryListInt>();
</script>

<template>
  <section>
    <h2 class="section-title">History:</h2>

    <ul class="songs-list">
      <li v-for="song in props.songs" :key="song.time">
        <TrackItem :song="song" />
      </li>
    </ul>
  </section>
</template>

<style>
.songs-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px 5px;
}
</style>
