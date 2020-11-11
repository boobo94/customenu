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
        <SquareGridElement v-bind="element" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SquareGridElement from '@/components/SquareGridElement.vue';
import axios from 'axios';

export default {
  name: 'Subcategories',
  components: {
    SquareGridElement,
  },
  data() {
    return {
      isLoading: true,
      elements: [],
    };
  },

  async created() {
    const { restaurantUrl, categoryId } = this.$route.params;
    const { data } = await axios.get(
      `/web/v1/${restaurantUrl}/categories/${categoryId}/subcategories`,
    );

    this.isLoading = false;
    this.elements = data;
  },
};
</script>
