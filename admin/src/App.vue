<template>
  <v-app>
    <Notification />
    <Navigation v-if="isLoggedIn" />

    <v-main>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-main>

    <Footer v-if="isLoggedIn" />
  </v-app>
</template>

<script>
import Notification from '@/components/notifications/Notification.vue';
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';
import axiosErrorInterceptor from '@/services/axiosService';

export default {
  name: 'App',
  components: {
    Notification,
    Navigation,
    Footer,
  },

  created() {
    axiosErrorInterceptor(this.$store, this.$router);
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['authModule/isLoggedIn'];
    },
  },
};
</script>
