<template >
  <v-text-field
    v-model="search"
    :label="t('SEARCH_LABEL')"
    append-inner-icon="mdi-magnify"
    variant="solo"
    hide-details
    clearable
  ></v-text-field>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product';

const { t } = useI18n();

const {
  params: { restaurantUrl },
  name,
} = useRoute();
const router = useRouter();

const scope = reactive({
  keyword: '',
  timeout: null,
});

const productStore = useProductStore();

const isSearchPage = computed(() => name === 'Search');

// implement debounce to stop spamming the server with requests after any character typed
const search = computed({
  get() {
    return scope.keyword;
  },
  set(val) {
    if (scope.timeout) clearTimeout(scope.timeout);
    scope.timeout = setTimeout(async () => {
      scope.keyword = await productStore.searchProduct(restaurantUrl, val);

      // if not already on search page go there
      if (!isSearchPage.value) {
        router.push({ name: 'Search', params: { restaurantUrl } });
      }
    }, isSearchPage.value ? 500 : 1000);
  },
});

</script>

<style>
</style>
