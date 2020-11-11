<template>
  <v-card class="mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-avatar tile size="100" color="grey">
        <v-img :src="image"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ name }}
        </v-list-item-title>
        <div class="overline">
          <span><v-icon >mdi-cash-multiple</v-icon> {{ price }}RON </span>
           <span><v-icon >mdi-weight-gram</v-icon> {{ weight }}g</span>
        </div>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: 'ProductInList',
  props: {
    name: String,
    image: String,
    description: String,
    price: Number,
    weight: Number,
  },
};
</script>

<style scoped>
/* Define styles here */
</style>
