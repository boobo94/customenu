<template>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-file-input
            show-size
            counter
            :label="$t('LABEL_IMAGE')"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"

          ></v-file-input>

          <CategoryI18n :items="category.category_i18ns" />

          <v-btn :disabled="!valid" color="info" class="mr-4" @click="validate">
            {{ $t("SUBMIT") }}
          </v-btn>
        </v-form>

</template>

<script>
import CategoryI18n from '@/components/CategoryI18n.vue';

export default {
  name: 'CategoryForm',
  components: {
    CategoryI18n,
  },
  props: {
    category: Object,
    submit: Function,
  },
  data() {
    return {
      valid: true,

    };
  },

  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        this.submit();
      }
    },
  },
};
</script>
