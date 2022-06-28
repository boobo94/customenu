<template>
  <v-container>
    <ProgressLoader :value="state.isLoading" />

    <v-row v-if="!state.isLoading">
      <v-col
        cols="6"
        sm="6"
        md="3"
        lg="2"
        v-for="cateogry in state.categories"
        :key="cateogry.id"
      >
        <div @click="goto(cateogry.id)" v-on:keypress="goto(cateogry.id)">
          <CategoryBlock v-bind="cateogry" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CategoryBlock from '@/components/CategoryBlock.vue';
import ProgressLoader from '@/components/ProgressLoader.vue';

const route = useRoute();
const router = useRouter();
const { restaurantUrl } = route.params;

const state = reactive({
  isLoading: true,
  categories: [],
});

onMounted(async () => {
  const { data } = await axios.get(`/web/v1/${restaurantUrl}/categories`);

  state.isLoading = false;
  state.categories = data;
});

function goto(categoryId) {
  router.push({
    name: 'Products',
    params: { restaurantUrl, categoryId },
  });
}
</script>

<style scoped lang="scss">
</style>
