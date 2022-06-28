<template>
  <v-container>
    <v-row v-if="isCartEmpty">
      <v-col cols="12">
        <p class="text-center">{{ t("CART_EMPTY_MESSAGE") }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" v-for="element in cartStore.products" :key="element.id">
        <ProductInList v-bind="element" />
      </v-col>
    </v-row>
    <v-row v-if="!isCartEmpty">
      <v-col cols="8">
        <p class="text-h6">{{ t("CART_TOTAL") }}</p>
      </v-col>
      <v-col cols="4">
        <p class="font-weight-bold">{{ totalPrice }} LEI</p>
      </v-col>
    </v-row>
    <v-row class="mb-15" v-if="!isCartEmpty">
      <v-btn
        @click="cartStore.reset()"
        block
        color="#F28700"
        class="white--text"
      >
        <v-icon dark> mdi-delete-empty </v-icon>
        {{ t("CART_DELETE_ALL") }}</v-btn
      >
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ProductInList from '@/components/ProductInList.vue';
import { useCartStore } from '@/stores/cart.js';

const { t } = useI18n();

const cartStore = useCartStore();

const isCartEmpty = computed(() => cartStore.products.length === 0);

const totalPrice = computed(() => cartStore.products.reduce(
  (acc, product) => acc + product.quantity * product.price,
  0,
));
</script>
