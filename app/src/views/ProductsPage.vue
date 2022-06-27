<template>
  <v-container class="pb-15">
    <v-row align="center" justify="center">
      <v-progress-circular
        v-if="state.isLoading"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-row>

    <v-row v-if="!state.isLoading">
      <v-col cols="12" v-for="element in state.elements" :key="element.id">
        <ProductInList v-bind="element" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ProductInList from '@/components/ProductInList.vue';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();

const state = reactive({
  isLoading: true,
  elements: [],
});

onMounted(async () => {
  const { restaurantUrl, categoryId } = route.params;
  const { data } = await axios.get(
    `/web/v1/${restaurantUrl}/categories/${categoryId}/products`,
  );

  state.isLoading = false;
  state.elements = data;
});
</script>
