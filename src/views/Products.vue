<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-row>

    <v-row v-if="!isLoading">
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="4"
        v-for="element in elements"
        :key="element.id"
      >
        <div @click="goto(element.id)">
          <ProductInList v-bind="element" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductInList from '@/components/ProductInList.vue';
import axios from 'axios';

export default {
  name: 'Products',
  components: {
    ProductInList,
  },
  data() {
    return {
      isLoading: true,
      elements: [],
    };
  },
  async created() {
    const { restaurantUrl, categoryId, subcategoryId } = this.$route.params;
    const { data } = await axios.get(
      `/web/v1/${restaurantUrl}/categories/${categoryId}/subcategories/${subcategoryId}/products`,
    );

    this.isLoading = false;
    this.elements = data;
  },
  methods: {
    goto(productId) {
      const { restaurantUrl, categoryId, subcategoryId } = this.$route.params;
      this.$router.push({
        name: 'Product',
        params: {
          restaurantUrl, categoryId, subcategoryId, productId,
        },
      });
    },
  },
};
</script>
