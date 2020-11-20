<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ProductForm :productProp="product" :submit="validate" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import ProductForm from '@/components/ProductForm.vue';

export default {
  name: 'CreateProduct',
  components: {
    ProductForm,
  },
  data() {
    return {
      valid: true,
      product: {
        image: '',
        product_i18ns: [],
      },
    };
  },

  created() {
    this.populateLanguages();
  },

  methods: {
    populateLanguages() {
      const { languages } = this.$store.state.authModule;
      this.product.product_i18ns = languages.map((language) => ({
        lang_code: language,
        name: '',
        description: '',
      }));
    },
    async validate() {
      const { restaurantId } = this.$store.state.authModule;
      await axios.post(
        `/restaurants/${restaurantId}/products`,
        this.product,
      );
      this.$router.go(-1);
    },
  },
};
</script>
