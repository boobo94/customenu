<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <SubcategoryForm :subcategory="subcategory" :submit="validate" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import SubcategoryForm from '@/components/SubcategoryForm.vue';

export default {
  name: 'EditCategory',
  components: {
    SubcategoryForm,
  },
  data() {
    return {
      valid: true,
      subcategory: {
        image: '',
        category_i18ns: [],
      },
      apiUrl: '',
    };
  },

  async created() {
    const { restaurantId } = this.$store.state.authModule;
    const { categoryId, subcategoryId } = this.$route.params;

    this.apiUrl = `/restaurants/${restaurantId}/categories/${categoryId}/subcategories/${subcategoryId}`;
    const { data } = await axios.get(this.apiUrl);

    this.subcategory = data;
  },

  methods: {
    async validate() {
      await axios.put(this.apiUrl, this.subcategory);
    },
  },
};
</script>
