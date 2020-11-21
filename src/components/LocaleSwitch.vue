<template>
 <v-responsive max-width="81">
  <v-select
    v-model="$i18n.locale"
    :items="languages"
    menu-props="auto"
    label="Select"
    hide-details
    prepend-icon="mdi-translate"
    single-line
    @change="changeLanguage"
  ></v-select>
   </v-responsive>
</template>

<script>
import axios from 'axios';

export default {
  name: 'locale-switch',
  data() {
    return { languages: ['en', 'ro'] };
  },
  methods: {
    changeLanguage(value) {
      axios.defaults.headers['accept-language'] = value;
      localStorage.setItem('language', value);
      this.$router.go();
      // todo: set the url
    },
  },
};
</script>

<style scoped>
</style>
