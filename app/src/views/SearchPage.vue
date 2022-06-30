<template>
  <v-container>
    <v-row class="header d-flex align-center">
      <v-col cols="2" sm="1">
        <v-btn
          icon="mdi-chevron-left"
          size="small"
          class="back-button"
          flat
          @click="goBack"
        >
        </v-btn>
      </v-col>
      <v-col cols="10" sm="11">
        <h1>{{ t("SEARCH_LABEL") }}</h1>
      </v-col>
      <v-col cols="12">
        <SearchField />
      </v-col>
    </v-row>

     <v-row v-if="!productStore.hasSearchResults">
      <v-col cols="12">
        <p class="text-center search-no-results">{{ t("SEARCH_NO_RESULTS") }}</p>
      </v-col>
    </v-row>

    <ProductCard
      v-for="element in productStore.products"
      :key="element.id"
      v-bind="element"
    />
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import ProductCard from '@/components/ProductCard.vue';
import SearchField from '@/components/SearchField.vue';
import { useProductStore } from '@/stores/product.js';

const router = useRouter();
const { t } = useI18n();
const productStore = useProductStore();

// Functions

function goBack() {
  return window.history.length > 1 ? router.go(-1) : router.push('/');
}
</script>

<style scoped lang="scss">
@import "@/styles/colors.scss";
@import "@/styles/fonts.scss";

.header {
  margin-bottom: 30px;

  h1 {
    font-family: $popins-medium;
    font-size: 24px;
    color: $font-color-dark;
  }
}

.back-button {
  background-color: $background-color;
}

.search-no-results {
  font-family: $popins-light;
  font-size: 20px;
  color: $font-color-dark;
  text-align: center;
}
</style>
