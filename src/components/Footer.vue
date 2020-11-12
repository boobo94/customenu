<template>
  <v-footer padless>
      <v-card
        flat
        tile
        width="100%"
        class="primary lighten-1 text-center"
      >
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Meniul Digital</strong>
        </v-card-text>
      </v-card>
    </v-footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
/* Define styles here */
</style>
