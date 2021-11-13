<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('SEARCH_TITLE')"
          single-line
        >
        </v-text-field>

        <TableElements
          :tableTitle="$t('PRODUCTS_TITLE')"
          :elements="elements"
          :isLoading="isLoading"
          :apiUrl="productsApiUrl"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import TableElements from '@/components/TableElements.vue';

export default {
  name: 'Products',
  components: {
    TableElements,
  },
  data() {
    return {
      isLoading: true,
      elements: [],
      productsApiUrl: '',
      search: '',
    };
  },

  async created() {
    const { restaurantId } = this.$store.state.authModule;
    this.productsApiUrl = `/restaurants/${restaurantId}/products`;
    const { data } = await axios.get(this.productsApiUrl);

    this.isLoading = false;
    this.elements = data;
  },

  methods: {},

  watch: {
    async search(keyword) {
      const { data } = await axios.get(`${this.productsApiUrl}/search`, {
        params: { keyword },
      });

      this.elements = data;
    },
  },
};
</script>
