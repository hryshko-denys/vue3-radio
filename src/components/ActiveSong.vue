<script lang="ts" setup>
import { toRef } from "vue";

import TrackItem from "./TrackItem.vue";

import { TrackItemWithAlbumInt } from "../types/TrackTypes";

interface TrackItemProp {
  song: TrackItemWithAlbumInt;
}

const props = defineProps<TrackItemProp>();
const song = toRef(props, "song");
</script>

<template>
  <section class="active-song">
    <h2 class="section-title">Playing song:</h2>

    <TrackItem v-if="song" :song="song" is-active />

    <div v-else>Couldn't find playings song</div>
  </section>
</template>

<style>
.active-song {
  display: flex;
  flex-direction: column;

  width: min-content;
}
</style>
