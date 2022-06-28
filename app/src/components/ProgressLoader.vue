<template >
  <v-container>
    <v-progress-circular
      class="screen-center"
      indeterminate
      color="primary"
    ></v-progress-circular>

    <h1 v-if="message != null">{{ message }}</h1>
  </v-container>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  message: {
    type: String,
  },
});
</script>

<style>
.screen-center {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
