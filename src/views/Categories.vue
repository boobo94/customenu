<template>
  <SquareGridElement v-bind="test" />
</template>

<script>
import SquareGridElement from '@/components/SquareGridElement.vue'

export default {
  name: 'Categories',
  components: {
    SquareGridElement
  },
  data() {
    return {
      test: {
        id: 1,
        name: "food",
      }
    }
  }
}
</script>
