<template>
  <v-container>
    <v-row>
      <v-col cols="6" sm="6" md="3" lg="2" v-for="element in elements" :key="element.id">
        <SquareGridElement v-bind="element" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SquareGridElement from '@/components/SquareGridElement.vue';

export default {
  name: 'Categories',
  components: {
    SquareGridElement,
  },
  data() {
    return {
      elements: [
        {
          id: 1,
          name: 'food',
          image: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        },
        {
          id: 2,
          name: 'drinks',
          image: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        },
        {
          id: 3,
          name: 'wine',
          image: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        },
        {
          id: 4,
          name: 'chips',
          image: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        },
      ],
    };
  },
};
</script>
