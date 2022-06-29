import axios from 'axios';
import { defineStore } from 'pinia';

export const useRestaurantStore = defineStore('restaurantStore', {

  state: () => ({
    restaurant: {
      id: 0,
      shortUrl: '',
      currency: '',
      email: '',
      phone: '',
      address: '',
      instagramUrl: '',
      facebookUrl: '',
      youtubeUrl: '',
      name: '',
      description: '',
      logo: '',
    },
  }),

  actions: {
    async getRestaurant(restaurantUrl) {
      const { data } = await axios.get(`/web/v1/${restaurantUrl}`);
      this.restaurant = data;
    },

  },
});
