<script lang="ts" setup>
import { onMounted } from "vue";

import ActiveSong from "./components/ActiveSong.vue";
import HistoryList from "./components/HistoryList.vue";
import Loader from "./components/Loader.vue";

import showError from "./utils/errorHandling";
import { delay } from "./utils/delay";

import { useFetchRadioList } from "./composables/useFetchRadioList";

const { playingSong, historyList, updateSongs, isFirstListLoaded } =
  useFetchRadioList();

onMounted(async () => {
  try {
    function request() {
      Promise.all([updateSongs(), delay]).then(() => request());
    }

    request();
  } catch (error) {
    console.error(error);

    showError();
  }
});
</script>

<template>
  <div class="loader-wrapper" v-if="!isFirstListLoaded">
    <Loader />
  </div>
  <div v-else class="content">
    <ActiveSong v-if="playingSong" :song="playingSong" />
    <HistoryList v-if="historyList" :songs="historyList" />
  </div>
</template>

<style>
.content {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 100px;
}

.loader-wrapper {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 860px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
