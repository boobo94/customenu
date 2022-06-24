<template>
  <v-card>
    <v-img
      :src="image"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="150"
    >
      <v-card-title v-text="name"></v-card-title>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: 'SquareGridElement',
  props: {
    name: String,
    image: String,
  },
};
</script>

<style scoped>
/* Define styles here */
</style>
