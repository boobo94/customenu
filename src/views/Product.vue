<template>
  <v-container>
    <v-row>
      <v-col>
        <v-img :src="product.image"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" md="10">
        <h1>{{ product.name }}</h1>
      </v-col>
      <v-col cols="4" md="2" class="text-end">
        <div><v-icon>mdi-cash-multiple</v-icon> {{ product.price }}RON</div>
        <div><v-icon>mdi-weight-gram</v-icon> {{ product.weight }}g</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>{{ product.description }}</v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Product',

  data() {
    return {
      product: {
        id: 1,
        name: 'product 1',
        image:
          'https://estonianworld.com/wp-content/uploads/2019/09/burger-king.jpg',
        description: 'lorem ipsum',
        price: 2.3,
        weight: 23.45,
      },
    };
  },
};
</script>
