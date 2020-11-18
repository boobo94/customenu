<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <TableElements
          :tableTitle="$t('CATEGORIES_TITLE')"
          :elements="elements"
          :isLoading="isLoading"
          :apiUrl="subcategoriesApiUrl"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import TableElements from '@/components/TableElements.vue';

export default {
  name: 'Subcategories',
  components: {
    TableElements,
  },
  data() {
    return {
      isLoading: true,
      elements: [],
      subcategoriesApiUrl: '',
    };
  },

  async created() {
    const { restaurantId } = this.$store.state.authModule;
    const { categoryId } = this.$route.params;
    this.subcategoriesApiUrl = `/restaurants/${restaurantId}/categories/${categoryId}/subcategories`;
    const { data } = await axios.get(this.subcategoriesApiUrl);

    this.isLoading = false;
    this.elements = data;
  },

  methods: {

  },
};
</script>
