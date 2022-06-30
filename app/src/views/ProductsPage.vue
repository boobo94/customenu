<template>
  <v-container>
    <v-row class="header d-flex align-center">
      <v-col cols="2" sm="1">
        <v-btn
          v-if="!isHomePage"
          icon="mdi-chevron-left"
          size="small"
          class="back-button"
          flat
          @click="goBack"
        >
        </v-btn>
      </v-col>
      <v-col cols="10" sm="11">
        <h1>{{ productStore.category.name }}</h1>
      </v-col>
      <v-col cols="12">
        <SearchField />
      </v-col>
    </v-row>

    <ProgressLoader v-if="state.isLoading" />

    <div v-else>
      <ProductCard
        v-for="element in productStore.products"
        :key="element.id"
        v-bind="element"
      />
    </div>
  </v-container>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProgressLoader from '@/components/ProgressLoader.vue';
import ProductCard from '@/components/ProductCard.vue';
import SearchField from '@/components/SearchField.vue';
import { useProductStore } from '@/stores/product.js';

const {
  params: { restaurantUrl, categoryId },
  name,
} = useRoute();

const router = useRouter();

const state = reactive({
  isLoading: true,
});

const productStore = useProductStore();

onMounted(async () => {
  await productStore.getProducts(restaurantUrl, categoryId);

  state.isLoading = false;
});

// Functions

const isHomePage = computed(() => name === 'Home');

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
</style>
