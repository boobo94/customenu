<template>
  <v-footer padless>
    <v-card flat tile width="100%" class="primary lighten-1 text-center">
      <v-card-text class="white--text">
        <strong><a href="https://customenu.net" class="white--text" target="_blank">Customenu</a> {{ $t("FOOTER_LOGO") }} <a href="https://cmevo.com" class="white--text" target="_blank">Cmevo Digital</a></strong> - © {{ new Date().getFullYear() }}
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
