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
        category_i18ns: [],
      },
      apiUrl: '',
    };
  },

  async created() {
    const { restaurantId } = this.$store.state.authModule;
    const { categoryId } = this.$route.params;

    this.apiUrl = `/restaurants/${restaurantId}/categories/${categoryId}`;
    const { data } = await axios.get(this.apiUrl);

    this.category = data;
  },

  methods: {
    async validate() {
      await axios.put(this.apiUrl, this.category);
    },
  },
};
</script>
