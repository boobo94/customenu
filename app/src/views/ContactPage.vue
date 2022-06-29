<template>
  <v-container>
    <ProgressLoader v-if="state.isLoading" />

    <template v-else>
      <v-row class="header">
        <v-col cols="12">
          <h1>{{t("ABOUT_TITLE_PAGE")}}</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h2>{{ restaurantStore.restaurant.name }}</h2>
          <p>{{ restaurantStore.restaurant.description }}</p>

          <div class="text-center links">
            <a
              v-if="restaurantStore.restaurant.email"
              :href="`mailto:${restaurantStore.restaurant.email}`"
              class="mx-2"
            >
              <v-icon large color="grey darken-2"> mdi-email </v-icon>
            </a>
            <a
              v-if="restaurantStore.restaurant.phone"
              :href="`tel:${restaurantStore.restaurant.phone}`"
              class="mx-2"
              ><v-icon large color="green darken-2"> mdi-phone </v-icon></a
            >
            <a
              v-if="restaurantStore.restaurant.address"
              :href="`https://maps.google.com/?q=${restaurantStore.restaurant.address}`"
              class="mx-2"
              target="_blank"
            >
              <v-icon large color="yellow darken-2"> mdi-map </v-icon></a
            >
            <a
              v-if="restaurantStore.restaurant.instagramUrl"
              :href="restaurantStore.restaurant.instagramUrl"
              class="mx-2"
              target="_blank"
            >
              <v-icon large color="pink darken-2"> mdi-instagram </v-icon></a
            >
            <a
              v-if="restaurantStore.restaurant.facebookUrl"
              :href="restaurantStore.restaurant.facebookUrl"
              class="mx-2"
              target="_blank"
            >
              <v-icon large color="blue darken-2"> mdi-facebook </v-icon></a
            >
            <a
              v-if="restaurantStore.restaurant.youtubeUrl"
              :href="restaurantStore.restaurant.youtubeUrl"
              class="mx-2"
              target="_blank"
            >
              <v-icon large color="red darken-2"> mdi-youtube </v-icon></a
            >
          </div>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import ProgressLoader from '@/components/ProgressLoader.vue';
import { useRestaurantStore } from '@/stores/restaurant.js';

const restaurantStore = useRestaurantStore();

const { t } = useI18n();

const state = reactive({
  isLoading: true,
});

onMounted(async () => {
  state.isLoading = false;
});
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/fonts.scss';

.links {
  margin-top: 2rem;
}

.header {
  margin-top: 10px;
  margin-bottom: 40px;

  h1 {
    font-family: $popins-medium;
    font-size: 24px;
    color: $font-color-dark;
  }
}
</style>
