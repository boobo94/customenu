<template>
  <v-app-bar app color="primary" dark>
    <router-link :to="{ name: 'Contact' }">
      <v-btn icon>
        <v-icon>mdi-silverware-fork-knife</v-icon>
      </v-btn>
    </router-link>

    <div class="empty-button-size">
      <v-btn icon @click="goBack" v-if="!isHomePage()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>

    <v-spacer></v-spacer>

    <router-link :to="{ name: 'Home' }">
      <img :src="restaurant.logo" :alt="restaurant.shortUrl" height="50" />
    </router-link>

    <v-spacer></v-spacer>

    <router-link :to="{ name: 'Cart' }">
      <v-btn icon class="mr-2">
        <v-icon>mdi-cart-variant</v-icon>
      </v-btn>
    </router-link>
    <LocaleSwitch :languagesProp="restaurant.languages" />
  </v-app-bar>
</template>

<script>
import LocaleSwitch from '@/components/LocaleSwitch.vue';
import axios from 'axios';

export default {
  name: 'Navigation',
  props: {},
  components: {
    LocaleSwitch,
  },
  data() {
    return {
      restaurant: {
        id: 0,
        logo: 'Customenu',
        shortUrl: '',
        languages: [],
      },
    };
  },
  async created() {
    const { restaurantUrl } = this.$route.params;
    const { data } = await axios.get(`/web/v1/${restaurantUrl}/simple`);

    this.restaurant = data;
  },
  methods: {
    goBack() {
      return window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/');
    },
    isHomePage() {
      return this.$route.name === 'Home';
    },
    gotoRestaurant() {
      return this.$router.push({ name: 'Contact' });
    },
    gotoHome() {
      return this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style scoped>
.empty-button-size {
  width: 48px;
  height: 48px;
}
</style>
