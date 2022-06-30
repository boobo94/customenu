<template >
  <v-text-field
    :label="t('SEARCH_LABEL')"
    append-inner-icon="mdi-magnify"
    variant="solo"
  ></v-text-field>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style>
</style>
