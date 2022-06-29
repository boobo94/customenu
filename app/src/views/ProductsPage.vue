<template>
  <v-container>
    <ProgressLoader v-if="state.isLoading" />

    <div v-else>
      <ProductCard
        v-for="element in state.elements"
        :key="element.id"
        v-bind="element"
      />
    </div>
  </v-container>
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import ProgressLoader from '@/components/ProgressLoader.vue';
import ProductCard from '@/components/ProductCard.vue';

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
