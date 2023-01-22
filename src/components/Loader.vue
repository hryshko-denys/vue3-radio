<template>
  <div class="loader" />
</template>

<style>
.loader {
  display: block;
  width: 100px;
  height: 100px;

  border: 3px solid;
  border-radius: 50%;
  border-color: transparent #000 #000;

  animation: cssload-spin 690ms infinite linear;
}

@keyframes cssload-spin {
  100% {
    transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
