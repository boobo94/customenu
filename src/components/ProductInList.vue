<template>
  <v-card class="mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-avatar
        tile
        size="100"
        color="grey"
        class="pointer"
        @click="gotoProduct"
      >
        <v-img :src="image"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="headline mb-1 pointer" @click="gotoProduct">
          {{ name }}
        </v-list-item-title>
        <v-list-item-subtitle v-if="isCartPage">
          x {{ quantity }} {{ $t("QUANTITY_LABEL") }}
        </v-list-item-subtitle>
        <div class="overline">
          <span><v-icon>mdi-cash-multiple</v-icon> {{ price }}RON </span>
          <span><v-icon>mdi-weight-gram</v-icon> {{ weight }}g</span>
        </div>
      </v-list-item-content>
    </v-list-item>

    <v-fab-transition>
      <v-btn
        v-if="!isCartPage"
        color="green"
        fab
        dark
        small
        absolute
        bottom
        right
        @click="addToCart"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        v-if="isCartPage"
        color="red"
        fab
        dark
        small
        absolute
        bottom
        right
        @click="removeFromCart"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-card>
</template>

<script>
export default {
  name: 'ProductInList',
  props: {
    id: Number,
    name: String,
    image: String,
    description: String,
    price: Number,
    weight: Number,
    quantity: Number,
  },
  computed: {
    isCartPage() {
      return this.$router.currentRoute.name === 'Cart';
    },
  },

  methods: {
    addToCart() {
      this.$store.dispatch('cart/add', {
        id: this.id,
        name: this.name,
        image: this.image,
        description: this.description,
        price: this.price,
        weight: this.weight,
      });
    },
    removeFromCart() {
      this.$store.dispatch('cart/delete', this.id);
      // this.elements = this.$store.state.cart.products;
    },

    gotoProduct() {
      const { restaurantUrl, categoryId, subcategoryId } = this.$route.params;
      const productId = this.id;
      this.$router.push({
        name: 'Product',
        params: {
          restaurantUrl,
          categoryId,
          subcategoryId,
          productId,
        },
      });
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
