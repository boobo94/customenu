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
      <v-col cols="12" v-for="(element, index) in elements" :key="element.id">
        <div>
          <v-btn @click="removeFromCart(index)">Remove</v-btn>
          <ProductInList v-bind="element" />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-btn @click="resetCart">Delete cart</v-btn>
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
  data() {
    return {
      isLoading: true,
      elements: [],
    };
  },
  async created() {
    this.isLoading = false;
    this.elements = this.$store.state.cart.products;
  },
  methods: {
    resetCart() {
      this.$store.dispatch('cart/reset');
      this.elements = this.$store.state.cart.products;
    },
    removeFromCart(index) {
      this.$store.dispatch('cart/delete', index);
      this.elements = this.$store.state.cart.products;
    },
  },
};
</script>
