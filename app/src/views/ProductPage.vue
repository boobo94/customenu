<template>
  <v-container class="pb-15">
    <v-row align="center" justify="center">
      <v-progress-circular
        v-if="state.isLoading"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-row>

    <template v-if="!state.isLoading">
      <v-row>
        <v-col>
          <v-img :src="state.product.image"></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" md="10">
          <h1>{{ state.product.name }}</h1>
        </v-col>
        <v-col cols="4" md="2" class="text-end">
          <div>
            <v-icon>mdi-cash-multiple</v-icon> {{ state.product.price }}RON
          </div>
          <div>
            <v-icon>mdi-weight-gram</v-icon> {{ state.product.weight }}g
          </div>
          <div>
            <v-icon>mdi-timer-outline</v-icon>
            {{ state.product.cookingTime }}min
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          {{ state.product.description }}
        </v-col>
      </v-row>
      <v-row v-if="state.product.allergens">
        <v-col class="mt-2">
          <h3>{{ t("ALLERGENS_TITLE") }}</h3>
          <p>{{ state.product.allergens }}</p>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const { t } = useI18n();

const state = reactive({
  isLoading: true,
  product: null,
});

onMounted(async () => {
  const { restaurantUrl, categoryId, productId } = route.params;

  const { data } = await axios.get(
    `/web/v1/${restaurantUrl}/categories/${categoryId}/products/${productId}`,
  );

  state.isLoading = false;
  state.product = data;
});
</script>
