<template>
  <v-container>
    <v-row class="header">
      <v-col cols="8">
        <h1>{{ t("CART_TITLE_PAGE") }}</h1>
      </v-col>
      <v-col cols="4">
        <v-btn
          v-if="!cartStore.isCartEmpty()"
          @click="cartStore.reset()"
          block
          color="primary"
          class="white--text"
        >
          <v-icon dark> mdi-delete-empty </v-icon>
          {{ t("CART_DELETE_ALL") }}</v-btn
        >
      </v-col>
    </v-row>

    <v-row v-if="cartStore.isCartEmpty()">
      <v-col cols="12">
        <p class="text-center empty-cart">{{ t("CART_EMPTY_MESSAGE") }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" v-for="element in cartStore.products" :key="element.id">
        <ProductCard v-bind="element" />
      </v-col>
    </v-row>

    <v-row v-if="!cartStore.isCartEmpty()" class="total-cart-box">
      <v-col cols="8">
        <p class="text-h6">{{ t("CART_TOTAL") }}</p>
      </v-col>
      <v-col cols="4">
        <p class="font-weight-bold">
          {{ cartStore.getTotalPriceOfCart() }} LEI
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useCartStore } from '@/stores/cart.js';
import ProductCard from '@/components/ProductCard.vue';

const { t } = useI18n();

const cartStore = useCartStore();
</script>

<style scoped lang="scss">
@import "@/styles/colors.scss";
@import "@/styles/fonts.scss";

.header {
  margin-top: 10px;
  margin-bottom: 30px;

  h1 {
    font-family: $popins-medium;
    font-size: 24px;
    color: $font-color-dark;
  }
}

.total-cart-box {
  background-color: $font-color-dark;
  position: fixed;
  bottom: 55px;
  left: 0;
  width: 100%;
  margin: 0;
  border-radius: 50px 50px 0 0;
  font-family: $popins-semibold;
  font-size: 16px;
  color: #fff;
  padding: 35px 55px;
}

.empty-cart {
  font-family: $popins-light;
  font-size: 20px;
  color: $font-color-dark;
  text-align: center;
}
</style>
