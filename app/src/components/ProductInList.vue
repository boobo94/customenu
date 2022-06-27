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
          <span><v-icon>mdi-timer-outline</v-icon> {{ cookingTime }}min</span>
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
        @click="cartStoe.deleteProduct(id)"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-card>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import { computed, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  id: Number,
  name: String,
  image: String,
  description: String,
  price: Number,
  weight: String,
  quantity: Number,
  cookingTime: Number,
});

const router = useRouter();
const route = useRoute();

const isCartPage = computed(() => route.name === "Cart");

const cartStoe = useCartStore();

function addToCart() {
  cartStoe.addProduct({
    id: props.id,
    name: props.name,
    image: props.image,
    description: props.description,
    price: props.price,
    weight: props.weight,
  });
}

function gotoProduct() {
  const { restaurantUrl, categoryId } = route.params;

  router.push({
    name: "Product",
    params: {
      restaurantUrl,
      categoryId,
      productId: props.id,
    },
  });
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
