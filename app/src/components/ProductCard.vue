<template>
  <v-container class="product">
    <v-row class="d-flex align-center">
      <v-col cols="3">
        <v-img
          :src="image || '/images/image-placeholder.jpg'"
          :alt="name"
          loading="lazy"
          :aspect-ratio="1 / 1"
          cover
          class="product-image-container"
        />
      </v-col>

      <v-col cols="7">
        <h2>{{ name }}</h2>

        <v-row class="product-details">
          <v-col cols="4">
            <span><v-icon>mdi-cash-multiple</v-icon> {{ price }} </span>
          </v-col>

          <v-col cols="4">
            <span><v-icon>mdi-weight-gram</v-icon> {{ weight }}g</span>
          </v-col>

          <v-col cols="4">
            <span
              ><v-icon>mdi-clock-time-seven-outline</v-icon>
              {{ cookingTime }}min</span
            >
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="2" class="d-flex flex-column align-center">
        <v-btn
          :color="cartStoe.getQuantityOfProduct(id) ? '' : 'primary'"
          icon="mdi-plus"
          size="x-small"
          variant="flat"
          @click="addToCart"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>

        <span
          class="cart-products-number"
          v-if="cartStoe.getQuantityOfProduct(id)"
        >
          {{ cartStoe.getQuantityOfProduct(id) }}
        </span>

        <v-btn
          icon="mdi-minus"
          size="x-small"
          variant="flat"
          @click="cartStoe.deleteProduct(id)"
          v-if="cartStoe.getQuantityOfProduct(id)"
        >
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-expand-transition>
          <div class="expand-area" v-if="scope.expandCard">
            <h3>{{ t("PRODUCT_DESCRIPTION_TITLE") }}</h3>
            <p>{{ description }}</p>

            <h3>{{ t("ALLERGENS_DESCRIPTION_TITLE") }}</h3>
            <p>{{ allergens }}</p>
          </div>
        </v-expand-transition>

        <div class="d-flex justify-center expand-button">
          <v-btn
            v-if="scope.expandCard"
            icon="mdi-chevron-up"
            size="x-small"
            @click="scope.expandCard = !scope.expandCard"
          >
          </v-btn>

          <v-btn
            v-else
            icon="mdi-chevron-down"
            size="x-small"
            @click="scope.expandCard = !scope.expandCard"
          >
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineProps, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCartStore } from '@/stores/cart';

const props = defineProps({
  id: Number,
  name: String,
  image: String,
  description: String,
  price: Number,
  weight: String,
  quantity: Number,
  cookingTime: Number,
  allergens: String,
});

// const route = useRoute();

const scope = reactive({
  expandCard: false,
});

const { t } = useI18n();

const cartStoe = useCartStore();

function addToCart() {
  cartStoe.addProduct({
    id: props.id,
    name: props.name,
    image: props.image,
    description: props.description,
    price: props.price,
    weight: props.weight,
    quantity: props.weight,
    cookingTime: props.weight,
    allergens: props.weight,
  });
}
</script>

<style scoped lang="scss">
@import "@/styles/fonts.scss";
@import "@/styles/colors.scss";

.product {
  background-color: #fff;
  border-radius: 20px;

  .product-details {
    color: $primary;
    font-family: $popins-medium;
    font-size: 16px;
    line-height: 25px;
  }
}

.cart-products-number {
  padding: 2px;
  background-color: $primary;
  color: #fff;
  font-family: $popins-semibold;
  font-size: 16px;
  border-radius: 10px;
  min-width: 25px;
  text-align: center;
}

h2 {
  font-family: $popins-semibold;
  font-size: 16px;
  color: $font-color-dark;
}

.product-image-container {
  border-radius: 50%;
}

.expand-area {
  h3 {
    font-family: $popins-medium;
    font-size: 16px;
    color: $font-color-dark;
    margin-top: 25px;
  }

  p {
    font-family: $popins-light;
    font-size: 16px;
    color: $font-color-dark;
    line-height: 25px;
  }
}

.pointer {
  cursor: pointer;
}

.expand-button {
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
}
</style>
