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
  name: 'EditCategory',
  components: {
    CategoryForm,
  },
  data() {
    return {
      valid: true,
      category: {
        image: '',
        category_i18ns: [
          {
            name: '',
            lang_code: 'ro',
          },
          {
            name: '',
            lang_code: 'en',
          },
        ],
      },
    };
  },

  async created() {
    const { restaurantId } = this.$store.state.authModule;
    const { categoryId } = this.$route.params;

    this.categoriesApiUrl = `/restaurants/${restaurantId}/categories/${categoryId}`;
    const { data } = await axios.get(this.categoriesApiUrl);

    this.category = data;
  },

  methods: {
    async validate() {
      const { restaurantId } = this.$store.state.authModule;
      const { categoryId } = this.$route.params;
      await axios.put(
        `/restaurants/${restaurantId}/categories/${categoryId}`,
        this.category,
      );
    },
  },
};
</script>
