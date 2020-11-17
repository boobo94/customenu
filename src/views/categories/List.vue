<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <TableElements
          :tableTitle="$t('CATEGORIES_TITLE')"
          :elements="elements"
          :isLoading="isLoading"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import TableElements from '@/components/TableElements.vue';

export default {
  name: 'Categories',
  components: {
    TableElements,
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
