<template>
  <p>List all products</p>

  <ProductInList v-bind="product" />
</template>

<script>
import ProductInList from '@/components/ProductInList.vue'

export default {
  name: 'Products',
  components: {
    ProductInList
  },
  data() {
    return {
      product: {
        name: "food",
      }
    }
  }
}
</script>
