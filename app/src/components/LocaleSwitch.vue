<template>
  <v-responsive max-width="70">
    <v-select
      v-model="locale"
      :items="state.languages"
      label="Select"
      hide-details
      single-line
      v-on:update:model-value="changeLanguage"
    ></v-select>
  </v-responsive>
</template>

<script setup>
import {
  onMounted, defineProps, watch, reactive,
} from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const { locale } = useI18n();

const props = defineProps({
  languagesProp: Array,
});

const state = reactive({
  languages: props.languagesProp,
});

function changeLanguage(value) {
  axios.defaults.headers['accept-language'] = value;
  localStorage.setItem('language', value);
  router.go();
}

function setLanguage(languages) {
  if (!localStorage.getItem('language') && languages.length) {
    // detect the language of browser
    const browserLanguage = (
      navigator.language || navigator.userLanguage
    ).substr(0, 2);

    // if the language of browser is in the supported list then change it
    if (languages.includes(browserLanguage)) {
      // i18n.global.locale.value =browserLanguage
      changeLanguage(browserLanguage);
    } else {
      // if there are multiple languages pick the first one as default
      changeLanguage(props.languagesProp[0]);
    }
  }
}

onMounted(() => {
  setLanguage(state.languages);
});

// watch language changes from properties of components
watch(
  () => props.languagesProp,
  (languages) => {
    state.languages = languages;

    setLanguage(languages);
  },
);

</script>

<style scoped>
</style>
