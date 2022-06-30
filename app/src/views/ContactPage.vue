<template>
  <v-container>
    <ProgressLoader v-if="state.isLoading" />

    <template v-else>
      <v-row class="header">
        <v-col cols="12">
          <h1>{{ t("ABOUT_TITLE_PAGE") }}</h1>
        </v-col>
      </v-row>

      <v-row class="description">
        <v-col cols="12">
          <h2>{{ restaurantStore.restaurant.name }}</h2>

          <p>
            {{ restaurantStore.restaurant.description }}
          </p>

          <h3>{{ t("CONTACT_LABEL") }}</h3>

          <p>
            <a
              v-if="restaurantStore.restaurant.address"
              :href="`https://maps.google.com/?q=${restaurantStore.restaurant.address}`"
              target="_blank"
            >
              {{ restaurantStore.restaurant.address }}
            </a>
          </p>

          <p>
            {{ t("PHONE_LABEL") }}:
            <a
              v-if="restaurantStore.restaurant.phone"
              :href="`tel:${restaurantStore.restaurant.phone}`"
            >
              {{ restaurantStore.restaurant.phone }}
            </a>
          </p>

          <p>
            email:
            <a
              v-if="restaurantStore.restaurant.email"
              :href="`mailto:${restaurantStore.restaurant.email}`"
            >
              {{ restaurantStore.restaurant.email }}
            </a>
          </p>

          <h3>{{ t("SOCIAL_MEDIA_LABEL") }}</h3>

          <div class="text-center mt-2">
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
@import "@/styles/colors.scss";
@import "@/styles/fonts.scss";

.header {
  margin-top: 10px;
  margin-bottom: 30px;

  h1 {
    font-family: $popins-medium;
    font-size: 24px;
    color: $font-color-dark;
  }
}

h2 {
  font-family: $popins-medium;
  font-size: 24px;
  color: $font-color-dark;
}

h3 {
  font-family: $popins-medium;
  font-size: 24px;
  color: $font-color-dark;
  margin-top: 25px;
}

.description {
  font-family: $popins-regular;
  font-size: 16px;
  color: $font-color-dark;
}
</style>
