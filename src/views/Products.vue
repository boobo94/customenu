<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="4"
        v-for="element in elements"
        :key="element.id"
      >
        <ProductInList v-bind="element" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductInList from '@/components/ProductInList.vue';

export default {
  name: 'Products',
  components: {
    ProductInList,
  },
  data() {
    return {
      elements: [
        {
          id: 1,
          name: 'product 1',
          image: 'https://estonianworld.com/wp-content/uploads/2019/09/burger-king.jpg',
          description: 'lorem ipsum',
          price: 2.3,
          weight: 23.45,
        },
        {
          id: 2,
          name: 'product 2',
          image: 'https://www.citrusbits.com/wp-content/uploads/2017/04/burgerking-app-development-company.jpg',
          description: 'lorem ipsum',
          price: 2.3,
          weight: 23.45,
        },
        {
          id: 3,
          name: 'product 3',
          image: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          description: 'lorem ipsum',
          price: 2.3,
          weight: 23.45,
        },
        {
          id: 4,
          name: 'product 4',
          image: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          description: 'lorem ipsum',
          price: 2.3,
          weight: 23.45,
        },
      ],
    };
  },
};
</script>
