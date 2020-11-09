<template>
  <SquareGridElement v-bind="test" />
</template>

<script>
import SquareGridElement from '@/components/SquareGridElement.vue'

export default {
  name: 'Subcategories',
  components: {
    SquareGridElement
  },
  data() {
    return {
      test: {
        id: 1,
        name: "chicken",
      }
    }
  }
}
</script>
