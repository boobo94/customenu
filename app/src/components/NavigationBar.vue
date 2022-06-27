<template>
  <v-app-bar app color="primary" dark>
    <router-link :to="{ name: 'Contact' }">
      <v-btn icon>
        <v-icon>mdi-silverware-fork-knife</v-icon>
      </v-btn>
    </router-link>

    <div class="empty-button-size">
      <v-btn icon @click="goBack" v-if="!isHomePage">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>

    <v-spacer></v-spacer>

    <router-link :to="{ name: 'Home' }">
      <img
        :src="state.restaurant.logo"
        :alt="state.restaurant.shortUrl"
        height="50"
      />
    </router-link>

    <v-spacer></v-spacer>

    <router-link :to="{ name: 'Cart' }">
      <v-btn icon class="mr-2">
        <v-icon>mdi-cart-variant</v-icon>
      </v-btn>
    </router-link>
    <LocaleSwitch :languagesProp="state.restaurant.languages" />
  </v-app-bar>
</template>

<script setup>
import LocaleSwitch from '@/components/LocaleSwitch.vue';
import { computed, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const state = reactive({
  restaurant: {
    id: 0,
    logo: '',
    shortUrl: '',
    languages: [],
  },
});

onMounted(async () => {
  const { restaurantUrl } = route.params;

  const { data } = await axios.get(`/web/v1/${restaurantUrl}/simple`);
  state.restaurant = data;
});

const isHomePage = computed(() => route.name === 'Home');

function goBack() {
  return window.history.length > 1 ? router.go(-1) : router.push('/');
}
</script>

<style scoped>
.empty-button-size {
  width: 48px;
  height: 48px;
}
</style>
