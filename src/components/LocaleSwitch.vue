<template>
 <v-responsive max-width="50">
  <v-select
    v-model="$i18n.locale"
    :items="languages"
    menu-props="auto"
    label="Select"
    hide-details
    single-line
    @change="changeLanguage"
  ></v-select>
   </v-responsive>
</template>

<script>
import axios from 'axios';

export default {
  name: 'locale-switch',
  props: {
    languagesProp: Array,
  },
  data() {
    return {
      languages: this.languagesProp,
    };
  },
  watch: {
    languagesProp() {
      this.languages = this.languagesProp;
      if (!localStorage.getItem('language')) {
        this.setLanguage();
      }
    },
  },
  created() {
    // set the first one as default if not set
    if (!localStorage.getItem('language')) {
      this.setLanguage();
    }
  },
  methods: {
    setLanguage() {
      const [defaultLanguage] = this.languages;
      if (defaultLanguage) {
        axios.defaults.headers['accept-language'] = defaultLanguage;
        localStorage.setItem('language', defaultLanguage);
      }
    },
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
