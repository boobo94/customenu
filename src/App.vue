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

export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
