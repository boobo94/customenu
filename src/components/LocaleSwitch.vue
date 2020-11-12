<template>
  <v-select
    v-model="$i18n.locale"
    :items="languages"
    menu-props="auto"
    label="Select"
    hide-details
    prepend-icon="mdi-translate"
    single-line
    class="locale-switch"
    @change="changeLanguage"
  ></v-select>
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
.locale-switch {
  width: 48px;
}
</style>
