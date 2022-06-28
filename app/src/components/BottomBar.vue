<template>
  <v-bottom-navigation grow>
    <v-btn :to="{ name: 'Home' }">
      <v-icon>mdi-apps</v-icon>
    </v-btn>

    <v-btn :to="{ name: 'Contact' }">
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn :to="{ name: 'Cart' }">
      <v-icon>mdi-shopping</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

.v-btn {
  color: $primary;
}

</style>
