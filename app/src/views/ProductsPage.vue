<template>
  <v-container>
    <ProgressLoader v-if="state.isLoading" />

    <v-row v-else>
      <v-col cols="12" v-for="element in state.elements" :key="element.id">
        <ProductInList v-bind="element" />
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import ProductInList from '@/components/ProductInList.vue';
import ProgressLoader from '@/components/ProgressLoader.vue';

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
