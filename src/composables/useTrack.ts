import { computed, Ref } from "vue";

import {
  DEFAULT_IMG_URL,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE,
} from "../utils/constants";

import { TrackItemWithAlbumInt } from "../types/TrackTypes";

export function useTrack(song: Ref<TrackItemWithAlbumInt>) {
  const adaptedTime = computed(() =>
    new Date(song.value.time).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  );

  const adaptedTimeInSeconds = computed(() => {
    const separateTimeArray = song.value.duration.split(":");

    let seconds = 0;

    if (+separateTimeArray[0]) {
      seconds += +separateTimeArray[0] * SECONDS_IN_HOUR;
    }

    if (+separateTimeArray[1]) {
      seconds += +separateTimeArray[1] * SECONDS_IN_MINUTE;
    }

    seconds += +separateTimeArray[2];

    return seconds;
  });

  const adaptedDuration = computed(() => {
    let duration = "";
    let timeLeft = adaptedTimeInSeconds.value;

    const hours = Math.floor(timeLeft / SECONDS_IN_HOUR);

    if (hours > 1) {
      timeLeft -= hours * SECONDS_IN_HOUR;

      duration += `${hours} h `;
    }

    const minutes = Math.floor(timeLeft / SECONDS_IN_MINUTE);

    if (minutes > 1) {
      timeLeft -= minutes * SECONDS_IN_MINUTE;

      duration += `${minutes} m `;
    }

    duration += `${timeLeft} s`;

    return duration;
  });

  const songProgress = computed(() => {
    const currentDate = new Date();
    const songDate = new Date(song.value.time);

    const timeDifference = currentDate.getTime() - songDate.getTime();

    const secondsDifference = Math.floor(timeDifference / 1000);

    return secondsDifference;
  });

  const image = computed(() => song.value.imageUrl || DEFAULT_IMG_URL);

  const setAltImg = (event: any) => {
    event.target.src = DEFAULT_IMG_URL;
  };

  return {
    adaptedTime,
    adaptedDuration,
    image,
    songProgress,
    adaptedTimeInSeconds,
    setAltImg,
  };
}
