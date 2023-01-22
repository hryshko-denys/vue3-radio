<script lang="ts" setup>
import { onBeforeUnmount, toRef, ref, watch } from "vue";

interface ProgressProp {
  adaptedTimeInSeconds: number;
  songProgress: number;
}

const props = defineProps<ProgressProp>();
const songProgress = toRef(props, "songProgress");

const progress = ref(0);

watch(
  songProgress,
  () => {
    progress.value = songProgress.value;
  },
  { immediate: true }
);

const interval = setInterval(() => {
  progress.value++;
}, 1000);

onBeforeUnmount(() => clearInterval(interval));
</script>

<template>
  <progress
    id="playtime"
    :max="props.adaptedTimeInSeconds"
    :value="progress"
  ></progress>
</template>
