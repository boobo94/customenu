<template>
  <v-container class="pb-15">
    <v-row align="center" justify="center">
      <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-row>

    <template v-if="!isLoading">
      <v-row>
        <v-col>
          <v-img :src="product.image"></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" md="10">
          <h1>{{ product.name }}</h1>
        </v-col>
        <v-col cols="4" md="2" class="text-end">
          <div><v-icon>mdi-cash-multiple</v-icon> {{ product.price }}RON</div>
          <div><v-icon>mdi-weight-gram</v-icon> {{ product.weight }}g</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          {{ product.description }}
        </v-col>
      </v-row>
      <v-row>
        <v-col class="mt-2">
          <h3>{{ $t("ALLERGENS_TITLE") }}</h3>
          <p>{{ product.allergens }}</p>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Product',

  data() {
    return {
      isLoading: true,
      product: null,
    };
  },
  async created() {
    const {
      restaurantUrl,
      categoryId,
      subcategoryId,
      productId,
    } = this.$route.params;
    const { data } = await axios.get(
      `/web/v1/${restaurantUrl}/categories/${categoryId}/subcategories/${subcategoryId}/products/${productId}`,
    );

    this.isLoading = false;
    this.product = data;
  },
};
</script>
