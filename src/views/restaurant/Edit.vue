<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="restaurant.shortUrl"
            label="URL"
            disabled
          ></v-text-field>

          <v-file-input
            show-size
            counter
            :label="$t('LABEL_LOGO')"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
          ></v-file-input>

          <v-text-field
            v-model="restaurant.currency"
            :counter="255"
            :label="$t('CURRENCY')"
            :rules="validators.requiredRules"
            required
          ></v-text-field>

          <v-text-field
            v-model="restaurant.email"
            :counter="255"
            :label="$t('EMAIL_LABEL')"
          ></v-text-field>

          <v-text-field
            v-model="restaurant.phone"
            :counter="255"
            :label="$t('PHONE')"
          ></v-text-field>

          <v-text-field
            v-model="restaurant.address"
            :counter="255"
            :label="$t('LABEL_ADDRESS')"
          ></v-text-field>

          <v-text-field
            v-model="restaurant.instagramUrl"
            :counter="255"
            :label="$t('LABEL_INSTAGRAM_URL')"
          ></v-text-field>

          <v-text-field
            v-model="restaurant.facebookUrl"
            :counter="255"
            :label="$t('LABEL_FACEBOOK_URL')"
          ></v-text-field>

          <v-text-field
            v-model="restaurant.youtubeUrl"
            :counter="255"
            :label="$t('LABEL_YOUTUBE_URL')"
          ></v-text-field>

          <LanguageSelector
            v-bind:languagesProp="restaurant.languages"
            v-on:update:languagesProp="restaurant.languages = $event"
          />

          <div
            class="previous mt-10"
            v-for="(restaurantI18n, counter) in restaurant.restaurant_i18ns"
            v-bind:key="counter"
          >
            <v-card class="mx-auto mb-5" outlined>
              <v-card-actions>
                <div class="overline">
                  {{ $t("LANGUAGE") }} {{ restaurantI18n.lang_code }}
                </div>
              </v-card-actions>

              <v-list-item>
                <v-list-item-content>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="restaurantI18n.name"
                        :counter="255"
                        :label="$t('NAME')"
                        :rules="validators.requiredRules"
                        required
                      ></v-text-field>
                      <v-textarea
                        v-model="restaurantI18n.description"
                        :label="$t('DESCRIPTION')"
                        :rules="validators.requiredRules"
                        required
                      ></v-textarea>
                      <v-textarea
                        v-model="restaurantI18n.allergens"
                        :label="$t('LABEL_ALLERGENS')"
                        :rules="validators.requiredRules"
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import LanguageSelector from '@/components/LanguageSelector.vue';
import validators from './validators';
import EventBus from '../../components/notifications/EventBus';

export default {
  name: 'EditRestaurant',
  components: {
    LanguageSelector,
  },
  data() {
    return {
      valid: true,
      validators: validators(this),
      restaurant: {
        logo: '',
        currency: '',
        email: '',
        phone: '',
        instagramUrl: '',
        facebookUrl: '',
        youtubeUrl: '',
        restaurant_i18ns: [],
      },
      apiUrl: '',
    };
  },

  async created() {
    const { restaurantId } = this.$store.state.authModule;

    this.apiUrl = `/restaurants/${restaurantId}`;
    const { data } = await axios.get(this.apiUrl);

    this.restaurant = data;
    this.populateLanguages();
  },

  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        await axios.put(this.apiUrl, this.restaurant);
        EventBus.$emit('success', this.$t('SUCCESS_OPERATION'));
        this.$store.dispatch('authModule/setLanguages');
      }
    },

    populateLanguages() {
      const { languages } = this.$store.state.authModule;
      languages.forEach((language) => {
        if (!this.restaurant.restaurant_i18ns.some((el) => el.lang_code === language)) {
          this.restaurant.restaurant_i18ns.push({
            lang_code: language,
            name: '',
            description: '',
            allergens: '',
          });
        }
      });
    },
  },
};
</script>
