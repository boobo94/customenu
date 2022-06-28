<template>
  <div class="box-container">
    <div class="image-container">
      <img :src="image || './images/image-placeholder.jpg'" :alt="name" loading="lazy" />
    </div>

    <p>{{ name }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  name: String,
  image: String,
});
</script>

<style scoped lang="scss">
@import '@/styles/fonts.scss';

.box-container {
  background-color: #fff;
  border-radius: 16px;
  text-align: center;
  filter: drop-shadow(0 8px 5px #00000029);

  .image-container {
    padding: 14px 15px 7px 15px;
    height: 120px;

    img {
      border-radius: 16px;
      width: 100%;
    }
  }

  p {
    font-family: $popins-medium;
    font-size: 20px;
    text-align: center;
    padding-bottom: 21px;
  }
}
</style>
