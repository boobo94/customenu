<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-select
      v-model="selectedCategory"
      :hint="product.name"
      :items="categories"
      item-text="name"
      item-value="id"
      label="Select"
      persistent-hint
      return-object
      single-line
    ></v-select>

    <v-select
      v-model="selectedSubcategory"
      :hint="product.name"
      :items="subcategories"
      item-text="name"
      item-value="id"
      label="Select"
      persistent-hint
      return-object
      single-line
      :rules="[(v) => !!v || 'Item is required']"
    ></v-select>

    <v-text-field
      v-model="product.weight"
      :counter="255"
      :label="$t('WEIGHT')"
      :rules="requiredRules"
      required
    ></v-text-field>

    <v-text-field
      v-model="product.price"
      :counter="255"
      :label="$t('PRICE')"
      :rules="requiredRules"
      required
    ></v-text-field>

    <v-file-input
      show-size
      counter
      :label="$t('LABEL_IMAGE')"
      accept="image/png, image/jpeg, image/bmp"
      prepend-icon="mdi-camera"
      @change="convertToBase64"
    ></v-file-input>

    <v-img
      v-if="product.image"
      max-height="150"
      max-width="250"
      :src="product.image"
    ></v-img>

    <div
      class="previous mt-10"
      v-for="(productI18n, counter) in product.product_i18ns"
      v-bind:key="counter"
    >
      <v-card class="mx-auto mb-5" outlined>
        <v-card-actions>
          <div class="overline">
            {{ $t("LANGUAGE") }} {{ productI18n.lang_code }}
          </div>
        </v-card-actions>

        <v-list-item>
          <v-list-item-content>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="productI18n.name"
                  :counter="255"
                  :label="$t('NAME')"
                  :rules="requiredRules"
                  required
                ></v-text-field>
                <v-textarea
                  v-model="productI18n.description"
                  :counter="255"
                  :label="$t('DESCRIPTION')"
                  :rules="requiredRules"
                  required
                ></v-textarea>
                <v-textarea
                  v-model="productI18n.allergens"
                  :counter="255"
                  :label="$t('LABEL_ALLERGENS')"
                  :rules="requiredRules"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>

    <v-btn :disabled="!valid" color="info" class="mr-4" @click="validate">
      {{ $t("SUBMIT") }}
    </v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';
import EventBus from './notifications/EventBus';

export default {
  name: 'productForm',
  props: {
    productProp: Object,
    submit: Function,
  },
  data() {
    return {
      valid: true,
      product: this.productProp,
      selectedCategory: null,
      selectedSubcategory: null,
      categories: [],
      subcategories: [],
      requiredRules: [(v) => !!v || this.$t('REQUIRED_NAME')],
    };
  },

  async created() {
    const { restaurantId } = this.$store.state.authModule;
    const { data } = await axios.get(`/restaurants/${restaurantId}/categories`);

    this.categories = data;
  },

  watch: {
    productProp() {
      this.product = this.productProp;
      if (this.productProp.subcategory) {
        this.selectedSubcategory = { id: this.productProp.subcategoryId };
        this.selectedCategory = { id: this.productProp.subcategory.categoryId };
      }
      this.populateLanguages();
    },
    selectedCategory() {
      this.populateSubcategories();
    },
  },

  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        this.product.subcategoryId = this.selectedSubcategory.id;

        this.submit();
        EventBus.$emit('success', this.$t('SUCCESS_OPERATION'));
      }
    },

    async populateSubcategories() {
      const { restaurantId } = this.$store.state.authModule;
      const { data } = await axios.get(
        `/restaurants/${restaurantId}/categories/${this.selectedCategory.id}/subcategories`,
      );

      this.subcategories = data;
    },

    convertToBase64(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.product.file = e.target.result.toString();
      };
    },

    populateLanguages() {
      const { languages } = this.$store.state.authModule;
      languages.forEach((language) => {
        if (
          !this.product.product_i18ns.some((el) => el.lang_code === language)
        ) {
          this.product.product_i18ns.push({
            lang_code: language,
            name: '',
            description: '',
          });
        }
      });
    },
  },
};
</script>
