<template>
  <v-app-bar app color="primary" dark>

    <div @click="goBack" v-if="!isHomePage()">
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>

    <v-spacer></v-spacer>

    <div>Meniul Digital</div>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navigation',
  props: {},
  methods: {
    goBack() {
      this.$router.back();
    },
    isHomePage() {
      return this.$route.name === 'Home';
    },
  },
};
</script>

<style scoped>
/* Define styles here */
</style>
