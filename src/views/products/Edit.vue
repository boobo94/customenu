<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ProductForm
          :productProp="product"
          :submit="validate"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import ProductForm from '@/components/ProductForm.vue';

export default {
  name: 'EditProduct',
  components: {
    ProductForm,
  },
  data() {
    return {
      valid: true,
      product: {
        image: '',
        weight: '',
        price: 0,
        product_i18ns: [],
      },
      apiUrl: '',
    };
  },

  async created() {
    const { restaurantId } = this.$store.state.authModule;
    const { productId } = this.$route.params;

    this.apiUrl = `/restaurants/${restaurantId}/products/${productId}`;
    const { data } = await axios.get(this.apiUrl);

    this.product = data;
  },

  methods: {
    async validate() {
      await axios.put(this.apiUrl, this.product);
    },
  },
};
</script>
