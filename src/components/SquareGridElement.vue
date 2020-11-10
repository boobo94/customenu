<template>
  <p>This is my square grid {{name}}</p>
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
