<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-file-input
      show-size
      counter
      :label="$t('LABEL_IMAGE')"
      accept="image/png, image/jpeg, image/bmp"
      prepend-icon="mdi-camera"
      @change="convertToBase64"
    ></v-file-input>

    <v-img
      v-if="subcategory.image"
      max-height="150"
      max-width="250"
      :src="subcategory.image"
    ></v-img>

    <div
      class="previous mt-10"
      v-for="(subcategoryI18n, counter) in subcategory.subcategory_i18ns"
      v-bind:key="counter"
    >
      <v-card class="mx-auto mb-5" outlined>
        <v-card-actions>
          <div class="overline">
            {{ $t("LANGUAGE") }} {{ subcategoryI18n.lang_code }}
          </div>
        </v-card-actions>

        <v-list-item>
          <v-list-item-content>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="subcategoryI18n.name"
                  :counter="255"
                  :label="$t('NAME')"
                  :rules="nameRules"
                  required
                ></v-text-field>
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
import EventBus from './notifications/EventBus';

export default {
  name: 'SubcategoryForm',
  props: {
    subcategoryProp: Object,
    submit: Function,
  },
  data() {
    return {
      valid: true,
      subcategory: this.subcategoryProp,
      nameRules: [(v) => !!v || this.$t('REQUIRED_NAME')],
    };
  },

  watch: {
    subcategoryProp() {
      this.subcategory = this.subcategoryProp;
      this.populateLanguages();
    },
  },

  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        this.submit();
        EventBus.$emit('success', this.$t('SUCCESS_OPERATION'));
      }
    },

    populateLanguages() {
      const { languages } = this.$store.state.authModule;
      languages.forEach((language) => {
        if (
          !this.subcategory.subcategory_i18ns.some(
            (el) => el.lang_code === language,
          )
        ) {
          this.subcategory.subcategory_i18ns.push({
            lang_code: language,
            name: '',
          });
        }
      });
    },

    convertToBase64(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.category.file = e.target.result.toString();
      };
    },
  },
};
</script>
