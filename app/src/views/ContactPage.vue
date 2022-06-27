<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-progress-circular
        v-if="state.isLoading"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-row>

    <template v-if="!state.isLoading">
      <v-row>
        <v-col>
          <h1>{{ state.restaurant.name }}</h1>
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
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useRoute} from 'vue-router'

const route = useRoute()

const state = reactive({
  isLoading: true,
  restaurant: {
    id: 0,
    shortUrl: "",
    currency: "",
    email: "",
    phone: "",
    address: "",
    instagramUrl: "",
    facebookUrl: "",
    youtubeUrl: "",
    name: "",
    description: "",
    logo: "",
  },
});

onMounted(async () => {
  const { restaurantUrl } = route.params;
  const { data } = await axios.get(`/web/v1/${restaurantUrl}`);

  state.isLoading = false;
  state.restaurant = data;
});
</script>

<style scoped>
.links {
  margin-top: 2rem;
}
</style>
