<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-row>

    <template v-if="!isLoading">
      <v-row>
        <v-col>
          <h1>{{ restaurant.name }}</h1>
          <p>{{ restaurant.description }}</p>

          <div class="text-center links">
            <a v-if="restaurant.email" :href="mailto" class="mx-2">
              <v-icon large color="grey darken-2"> mdi-email </v-icon>
            </a>
            <a v-if="restaurant.phone" :href="tel" class="mx-2"
              ><v-icon large color="green darken-2"> mdi-phone </v-icon></a
            >
            <a
              v-if="restaurant.address"
              :href="location"
              class="mx-2"
              target="_blank"
            >
              <v-icon large color="yellow darken-2"> mdi-map </v-icon></a
            >
            <a
              v-if="restaurant.instagramUrl"
              :href="restaurant.instagramUrl"
              class="mx-2"
              target="_blank"
            >
              <v-icon large color="pink darken-2"> mdi-instagram </v-icon></a
            >
            <a
              v-if="restaurant.facebookUrl"
              :href="restaurant.facebookUrl"
              class="mx-2"
              target="_blank"
            >
              <v-icon large color="blue darken-2"> mdi-facebook </v-icon></a
            >
            <a
              v-if="restaurant.youtubeUrl"
              :href="restaurant.youtubeUrl"
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

<script>
import axios from 'axios';

export default {
  name: 'Contact',

  data() {
    return {
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
    };
  },
  async created() {
    const { restaurantUrl } = this.$route.params;
    const { data } = await axios.get(`/web/v1/${restaurantUrl}`);

    this.isLoading = false;
    this.restaurant = data;
  },
  computed: {
    mailto() {
      return `mailto:${this.restaurant.email}`;
    },
    tel() {
      return `tel:${this.restaurant.phone}`;
    },
    location() {
      return `https://maps.google.com/?q=${this.restaurant.address}`;
    },
  },
};
</script>

<style scoped>
.links {
  margin-top: 2rem;
}
</style>
