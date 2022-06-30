<template>
  <v-dialog>
    <template v-slot:activator="{ props }">
      <div class="d-flex align-center">
        <v-btn
          icon="mdi-web"
          size="small"
          class="lang-button"
          flat
          v-bind="props"
        >
        </v-btn>
        <span>{{ locale.toUpperCase() }}</span>
      </div>
    </template>

    <v-card class="change-language-popup">
      <v-card-title>{{ t("CHANGE_LANGUAGE_TITLE") }}</v-card-title>
      <v-card-text>
        <p
          v-for="language in state.languages"
          :key="language"
          @click="changeLanguage(language)"
          v-on:keypress="changeLanguage(language)"
          class="language"
          :class="{ 'active-language': language === locale }"
        >
          {{ language.toUpperCase() }}
        </p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {
  onMounted, defineProps, watch, reactive,
} from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const { t, locale } = useI18n();

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

<style scoped lang="scss">
@import "@/styles/colors.scss";
@import "@/styles/fonts.scss";

.lang-button {
  background-color: $background-color;
  color: $font-color-dark;
}

.change-language-popup {
  border-radius: 20px !important;
  padding: 10px;

  .v-card-title {
    font-family: $popins-medium;
    font-size: 24px;
    color: $font-color-dark;
  }
}

.language {
  font-family: $popins-medium;
  font-size: 16px;
  color: $font-color-dark;
  line-height: 45px;
  padding: 0 10px;
  cursor: pointer;

  &.active-language {
    background-color: #f43e40;
    color: white;
    border-radius: 6px;
  }
}
</style>
