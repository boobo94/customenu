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
        cols="6"
        sm="6"
        md="3"
        lg="2"
        v-for="element in elements"
        :key="element.id"
      >
        <div @click="goto(element.id)">
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Categories',
  components: {
  },
  data() {
    return {
      isLoading: true,
      elements: [],
    };
  },

  async created() {
    const { restaurantId } = this.$store.state.authModule;
    const { data } = await axios.get(`/restaurants/${restaurantId}/categories`);

    this.isLoading = false;
    this.elements = data;
  },

  methods: {
    goto(categoryId) {
      this.$router.push({ name: 'Subcategories', params: { categoryId } });
    },
  },
};
</script>
