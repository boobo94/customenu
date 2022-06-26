<template>
  <v-container>
    <v-row v-if="isCartEmpty">
      <v-col cols="12">
        <p class="text-center">{{ $t("CART_EMPTY_MESSAGE") }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" v-for="element in getProductsFromCart" :key="element.id">
        <ProductInList v-bind="element" />
      </v-col>
    </v-row>
    <v-row v-if="!isCartEmpty">
      <v-col cols="8">
        <p class="text-h6">{{ $t("CART_TOTAL") }}</p>
      </v-col>
      <v-col cols="4">
        <p class="font-weight-bold">{{ totalPrice }} LEI</p>
      </v-col>
    </v-row>
    <v-row class="mb-15" v-if="!isCartEmpty">
      <v-btn @click="resetCart" block color="#F28700" class="white--text">
        <v-icon dark> mdi-delete-empty </v-icon>
        {{ $t("CART_DELETE_ALL") }}</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
import ProductInList from '@/components/ProductInList.vue';

export default {
  name: 'Cart',
  components: {
    ProductInList,
  },
  computed: {
    isCartEmpty() {
      return this.$store.state.cart.products.length === 0;
    },
    getProductsFromCart() {
      return this.$store.state.cart.products;
    },
    totalPrice() {
      return this.$store.state.cart.products.reduce(
        (acc, product) => acc + product.quantity * product.price,
        0,
      );
    },
  },
  methods: {
    resetCart() {
      this.$store.dispatch('cart/reset');
    },
  },
};
</script>
