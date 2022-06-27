<template>
  <v-container class="pb-15">
    <v-row align="center" justify="center">
      <v-progress-circular
        v-if="state.isLoading"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-row>

    <v-row v-if="!state.isLoading">
      <v-col
        cols="6"
        sm="6"
        md="3"
        lg="2"
        v-for="element in state.elements"
        :key="element.id"
      >
        <div @click="goto(element.id)">
          <SquareGridElement v-bind="element" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import SquareGridElement from "@/components/SquareGridElement.vue";
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { restaurantUrl } = route.params;

const state = reactive({
  isLoading: true,
  elements: [],
});

onMounted(async () => {
  const { data } = await axios.get(`/web/v1/${restaurantUrl}/categories`);

  state.isLoading = false;
  state.elements = data;
});

function goto(categoryId) {
  router.push({
    name: "Products",
    params: { restaurantUrl, categoryId },
  });
}
</script>
