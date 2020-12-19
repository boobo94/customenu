<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>{{ $t("REGISTER_TITLE") }}</v-toolbar-title>
            </v-toolbar>

            <v-stepper v-model="step">
              <v-stepper-header>
                <v-stepper-step :complete="step > 1" step="1">
                  {{ $t("REGISTER_STEP_1_TITLE") }}
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="step > 2" step="2">
                  {{ $t("REGISTER_STEP_2_TITLE") }}
                </v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <!-- STEP 1 ACCOUNT -->
                <v-form ref="formStep1">
                  <v-stepper-content step="1">
                    <v-text-field
                      v-model="user.email"
                      :rules="validators.emailValidator"
                      @change="validators.emailValidator"
                      :label="$t('EMAIL_LABEL')"
                      name="email"
                      prepend-icon="mdi-account"
                      type="email"
                      v-on:keyup.enter="submit"
                    >
                    </v-text-field>

                    <v-text-field
                      v-model="user.password"
                      :rules="validators.passwordValidator"
                      :label="$t('PASSWORD_LABEL')"
                      name="user.password"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-on:keyup.enter="submit"
                    ></v-text-field>

                    <v-btn color="primary" @click="submit">
                      {{ $t("CONTINUE_TITLE") }}
                    </v-btn>
                  </v-stepper-content>
                </v-form>

                <!-- STEP 2 RESTAURANT ACCOUNT -->
                <v-form ref="formStep2">
                  <v-stepper-content step="2">
                    <v-text-field
                      v-model="restaurant.shortUrl"
                      :rules="validators.requiredRules"
                      :label="$t('LABEL_URL')"
                      :hint="$t('LABEL_URL_HINT')"
                    ></v-text-field>

                    <v-file-input
                      show-size
                      counter
                      :label="$t('LABEL_LOGO')"
                      accept="image/png, image/jpeg, image/bmp"
                      prepend-icon="mdi-camera"
                      @change="convertToBase64"
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
                      v-on:update:languagesProp="
                        updateSelectedLanguages($event)
                      "
                    />

                    <div
                      class="previous mt-10"
                      v-for="(
                        restaurantI18n, counter
                      ) in restaurant.restaurant_i18ns"
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

                    <v-btn color="primary" @click="submit">
                      {{ $t("REGISTER_TITLE") }}
                    </v-btn>

                    <v-btn text @click="step = 1">
                      {{ $t("BACK_TITLE") }}
                    </v-btn>
                  </v-stepper-content>
                </v-form>
              </v-stepper-items>
            </v-stepper>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p align="center">
              {{ $t("LOGIN_LINK_LABEL") }}
              <router-link :to="{ name: 'Login' }"
                >{{ $t("LOGIN_TITLE") }}
              </router-link>
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LanguageSelector from '@/components/LanguageSelector.vue';
import axios from 'axios';
import validators from './validators';
import languages from '../../utils/languages';

export default {
  name: 'Register',
  components: {
    LanguageSelector,
  },
  data() {
    return {
      validators: validators(this),
      step: 1,
      user: {
        email: '',
        password: '',
      },
      languages,
      restaurant: {
        logo: '',
        currency: 'ron',
        email: '',
        phone: '',
        instagramUrl: '',
        facebookUrl: '',
        youtubeUrl: '',
        languages: ['ro'],
        restaurant_i18ns: [
          {
            lang_code: 'ro', // default
            name: '',
            description: '',
            allergens: '',
          },
        ],
        qr_code: '',
      },
    };
  },

  methods: {
    async submit() {
      if (this.step === 1 && this.$refs.formStep1.validate()) {
        this.step = 2;
      } else if (this.step === 2 && this.$refs.formStep2.validate()) {
        await axios.post('/auth/register', {
          restaurant: this.restaurant,
          admin: this.user,
        });
        this.$router.push({ path: '/login' });
      }
    },

    convertToBase64(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.restaurant.file = e.target.result.toString();
      };
    },

    updateSelectedLanguages(newLanguages) {
      this.restaurant.languages = newLanguages;
      // clear elements from translations
      this.restaurant.restaurant_i18ns = this.restaurant.restaurant_i18ns.filter(
        (element) => newLanguages.includes(element.lang_code),
      );

      newLanguages.forEach((language) => {
        if (
          !this.restaurant.restaurant_i18ns.some(
            (el) => el.lang_code === language,
          )
        ) {
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
