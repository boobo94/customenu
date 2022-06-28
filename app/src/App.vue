<template>
  <v-app>
    <NavigationBar />
    <v-main>
      <router-view />
    </v-main>
    <BottomBar />
  </v-app>
</template>

<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
import BottomBar from './components/BottomBar.vue';
</script>

<style lang="scss">
@import "@/styles/colors.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.v-main {
  background-color: $background-color;
}
</style>
