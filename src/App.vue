<template>
  <v-app>
    <Navigation />

    <v-main>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';
import axiosErrorInterceptor from '@/services/axiosService';

export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
  },

  data: () => ({
    //
  }),
  created() {
    console.log('create interceptor');
    axiosErrorInterceptor(this.$store, this.$router);
  },
};
</script>
