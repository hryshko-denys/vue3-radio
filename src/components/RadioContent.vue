<script lang="ts" setup>
import { onMounted } from "vue";

import ActiveSong from "./ActiveSong.vue";
import HistoryList from "./HistoryList.vue";

import showError from "../utils/errorHandling";

import { useFetchRadioList } from "../composables/useFetchRadioList";

const { playingSong, historyList, updateSongs, isFirstListLoaded } = useFetchRadioList();

onMounted(async () => {
  try {
    function request() {
      const delay = new Promise((resolve) => setTimeout(resolve, 5000));
      Promise.all([updateSongs(), delay]).then(function () {
        request();
      });
    }
    request();
  } catch (error) {
    console.error(error);

    showError();
  }
});
</script>

<template>
  <div class="content">
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

@media screen and (max-width: 860px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
