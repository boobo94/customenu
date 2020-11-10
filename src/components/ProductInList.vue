<template>
  <p>This is my product in list {{name}}</p>
</template>

<script>
export default {
  name: 'ProductInList',
  props: {
    name: String,
    image: String,
    description: String,
    price: Number,
    weight: Number,
  },
};
</script>

<style scoped>
/* Define styles here */
</style>
