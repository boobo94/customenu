<template>
  <v-select
    v-model="selectedLanguages"
    :items="languages"
    :label="$t('SELECT_LANGUAGE')"
    :hint="$t('SELECT_LANGUAGE_HINT')"
    persistent-hint
    multiple
    @change="updateLanguages"
  ></v-select>
</template>

<script>
import languages from '../utils/languages';

export default {
  name: 'locale-switch',
  props: {
    languagesProp: Array,
    // this property is used because we don't need to populate user's languages on register
    needsLanguages: Boolean,
  },
  data() {
    return {
      languages,
      selectedLanguages: this.languagesProp,
    };
  },

  created() {
    if (this.needsLanguages) {
      this.$store.dispatch('authModule/setLanguages');
    }
  },

  watch: {
    languagesProp() {
      this.selectedLanguages = this.languagesProp;
    },
  },

  methods: {
    updateLanguages() {
      this.$emit('update:languagesProp', this.selectedLanguages);
    },
  },
};
</script>

<style scoped>
</style>
