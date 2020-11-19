<template>
  <v-container>
    <v-row>
      <v-col cols="12">
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
    };
  },

  async created() {
    const { restaurantId } = this.$store.state.authModule;
    this.productsApiUrl = `/restaurants/${restaurantId}/products`;
    const { data } = await axios.get(this.productsApiUrl);

    this.isLoading = false;
    this.elements = data;
  },

  methods: {

  },
};
</script>
