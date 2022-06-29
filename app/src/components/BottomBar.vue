<template>
  <div>
    <router-link :to="{ name: 'Contact' }">
      <v-img :src="restaurantStore.restaurant.logo" class="home-button"></v-img>
    </router-link>

    <v-bottom-navigation absolute grow>
      <v-btn :to="{ name: 'Home' }">
        <v-icon>mdi-apps</v-icon>
      </v-btn>

      <v-btn disabled></v-btn>

      <v-btn :to="{ name: 'Cart' }">
        <v-icon>mdi-shopping</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useRestaurantStore } from '@/stores/restaurant.js';

const route = useRoute();

const restaurantStore = useRestaurantStore();

const state = reactive({
  isLoading: true,
});

onMounted(async () => {
  await restaurantStore.getRestaurant(route.params.restaurantUrl);

  state.isLoading = false;
});
</script>

<style scoped lang="scss">
@import "@/styles/colors.scss";

.v-btn {
  color: $primary;
}

.home-button {
  position: fixed;
  z-index: 10000;
  background-color: $primary;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  padding: 0;
  margin: 0;
  width: 80px;
  height: 80px;

  :deep img {
    padding: 5px;
  }
}
</style>
