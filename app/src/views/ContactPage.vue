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
          <h2>{{ state.restaurant.name }}</h2>
          <p>{{ state.restaurant.description }}</p>

          <div class="text-center links">
            <a
              v-if="state.restaurant.email"
              :href="`mailto:${state.restaurant.email}`"
              class="mx-2"
            >
              <v-icon large color="grey darken-2"> mdi-email </v-icon>
            </a>
            <a
              v-if="state.restaurant.phone"
              :href="`tel:${state.restaurant.phone}`"
              class="mx-2"
              ><v-icon large color="green darken-2"> mdi-phone </v-icon></a
            >
            <a
              v-if="state.restaurant.address"
              :href="`https://maps.google.com/?q=${state.restaurant.address}`"
              class="mx-2"
              target="_blank"
            >
              <v-icon large color="yellow darken-2"> mdi-map </v-icon></a
            >
            <a
              v-if="state.restaurant.instagramUrl"
              :href="state.restaurant.instagramUrl"
              class="mx-2"
              target="_blank"
            >
              <v-icon large color="pink darken-2"> mdi-instagram </v-icon></a
            >
            <a
              v-if="state.restaurant.facebookUrl"
              :href="state.restaurant.facebookUrl"
              class="mx-2"
              target="_blank"
            >
              <v-icon large color="blue darken-2"> mdi-facebook </v-icon></a
            >
            <a
              v-if="state.restaurant.youtubeUrl"
              :href="state.restaurant.youtubeUrl"
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
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import ProgressLoader from '@/components/ProgressLoader.vue';

const route = useRoute();

const { t } = useI18n();

const state = reactive({
  isLoading: true,
  restaurant: {
    id: 0,
    shortUrl: '',
    currency: '',
    email: '',
    phone: '',
    address: '',
    instagramUrl: '',
    facebookUrl: '',
    youtubeUrl: '',
    name: '',
    description: '',
    logo: '',
  },
});

onMounted(async () => {
  const { restaurantUrl } = route.params;
  const { data } = await axios.get(`/web/v1/${restaurantUrl}`);

  state.isLoading = false;
  state.restaurant = data;
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
