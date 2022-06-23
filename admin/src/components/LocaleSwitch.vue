<template>
  <v-row>
    <v-col cols="6">
      <v-subheader> {{ $t("LANGUAGE") }}</v-subheader>
    </v-col>

    <v-col cols="6">
      <v-select
        v-model="$i18n.locale"
        :items="languages"
        menu-props="auto"
        label="Select"
        hide-details
        prepend-icon="mdi-web"
        single-line
        @change="changeLanguage"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  name: 'locale-switch',
  data() {
    return {
    };
  },

  created() {
    this.$store.dispatch('authModule/setLanguages');
    if (!localStorage.getItem('language')) {
      this.setLanguage();
    }
  },

  computed: {
    languages() {
      return this.$store.state.authModule.languages;
    },
  },

  watch: {
    languages() {
      if (!localStorage.getItem('language')) {
        this.setLanguage();
      }
    },
  },

  methods: {
    setLanguage() {
      const [defaultLanguage] = this.languages;
      if (defaultLanguage) {
        this.changeLanguage(defaultLanguage);
      }
    },
    changeLanguage(value) {
      axios.defaults.headers['accept-language'] = value;
      localStorage.setItem('language', value);
      this.$router.go();
    },
  },
};
</script>

<style scoped>
.locale-switch {
  width: 48px;
}
</style>
