<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <CategoryForm :category="category" :submit="validate" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import CategoryForm from '@/components/CategoryForm.vue';

export default {
  name: 'CreateCategory',
  components: {
    CategoryForm,
  },
  data() {
    return {
      valid: true,
      category: {
        image: '',
        category_i18ns: [],
      },
    };
  },

  created() {
    this.populateLanguages();
  },

  methods: {
    populateLanguages() {
      const { languages } = this.$store.state.authModule;
      this.category.category_i18ns = languages.map((language) => ({
        lang_code: language,
        name: '',
      }));
    },
    async validate() {
      const { restaurantId } = this.$store.state.authModule;
      await axios.post(
        `/restaurants/${restaurantId}/categories`,
        this.category,
      );
    },
  },
};
</script>
