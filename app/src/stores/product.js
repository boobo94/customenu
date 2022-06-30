import axios from 'axios';
import { defineStore } from 'pinia';

export const useProductStore = defineStore('productStore', {

  state: () => ({
    products: [],
    category: {
      id: 0,
      name: '',
      image: '',
    },
  }),

  actions: {
    async getProducts(restaurantUrl, categoryId) {
      const { data } = await axios.get(
        `/web/v1/${restaurantUrl}/categories/${categoryId}/products`,
      );
      this.products = data.products;
      this.category = data.category;
    },

    async searchProduct(restaurantUrl, keyword) {
      const { data } = await axios.get(
        `/web/v1/${restaurantUrl}/products/search`,
        {
          params: {
            keyword,
          },
        },
      );
      this.products = data;
    },

    hasSearchResults: () => this.products.length,

  },
});
