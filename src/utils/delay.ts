import { REQUEST_DELAY_TIME } from "./constants";

export const delay = new Promise((resolve) =>
  setTimeout(resolve, REQUEST_DELAY_TIME)
);
