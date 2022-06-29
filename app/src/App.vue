<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <BottomBar />
  </v-app>
</template>

<script setup>
import BottomBar from './components/BottomBar.vue';
</script>

<style lang="scss">
@import "@/styles/colors.scss";

.v-main {
  background-color: $background-color;
}
</style>
