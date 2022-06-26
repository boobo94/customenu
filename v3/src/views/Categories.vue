<template>
  <v-container class="pb-15">
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
          <SquareGridElement v-bind="element" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SquareGridElement from '@/components/SquareGridElement.vue';
import axios from 'axios';

export default {
  name: 'Categories',
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
    const { data } = await axios.get(
      `/web/v1/${this.$route.params.restaurantUrl}/categories`,
    );

    this.isLoading = false;
    this.elements = data;
  },

  methods: {
    goto(categoryId) {
      const { restaurantUrl } = this.$route.params;
      this.$router.push({
        name: 'Products',
        params: { restaurantUrl, categoryId },
      });
    },
  },
};
</script>
