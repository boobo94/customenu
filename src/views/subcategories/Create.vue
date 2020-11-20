<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <SubcategoryForm :subcategoryProp="subcategory" :submit="validate" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import SubcategoryForm from '@/components/SubcategoryForm.vue';

export default {
  name: 'CreateSubcategory',
  components: {
    SubcategoryForm,
  },
  data() {
    return {
      valid: true,
      subcategory: {
        image: '',
        subcategory_i18ns: [],
      },
    };
  },

  created() {
    this.populateLanguages();
  },

  methods: {
    populateLanguages() {
      const { languages } = this.$store.state.authModule;
      this.subcategory.subcategory_i18ns = languages.map((language) => ({
        lang_code: language,
        name: '',
      }));
    },
    async validate() {
      const { restaurantId } = this.$store.state.authModule;
      const { categoryId } = this.$route.params;
      await axios.post(
        `/restaurants/${restaurantId}/categories/${categoryId}/subcategories`,
        this.subcategory,
      );
    },
  },
};
</script>
