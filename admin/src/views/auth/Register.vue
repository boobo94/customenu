<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <img src="@/assets/logo.png" alt="Logo Customenu" height="140px" />
        </v-row>
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

                <v-divider></v-divider>

                <v-stepper-step :complete="step > 3" step="3">
                  {{ $t("REGISTER_STEP_3_TITLE") }}
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
                      :rules="validators.shortUrlRules"
                      :label="$t('LABEL_URL')"
                      :hint="$t('LABEL_URL_HINT')"
                    ></v-text-field>
                    <p>
                      {{ $t("LABEL_URL_LINK") }}
                      <a :href="getAppLink" target="_blank">{{ getAppLink }}</a>
                    </p>

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
                              </v-col>
                            </v-row>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                    </div>

                    <v-btn color="primary" @click="submit">
                      {{ $t("CONTINUE_TITLE") }}
                    </v-btn>

                    <v-btn text @click="step = 1">
                      {{ $t("BACK_TITLE") }}
                    </v-btn>
                  </v-stepper-content>
                </v-form>

                <!-- STEP 3 ACCOUNT -->
                <v-form ref="formStep3">
                  <v-stepper-content step="3">
                    <v-text-field
                      v-model="restaurant.billingCompanyName"
                      :rules="validators.requiredRules"
                      @change="validators.requiredRules"
                      :label="$t('BILLING_COMPANY_NAME_LABEL')"
                      v-on:keyup.enter="submit"
                    >
                    </v-text-field>

                    <v-text-field
                      v-model="restaurant.billingTaxId"
                      :rules="validators.requiredRules"
                      @change="validators.requiredRules"
                      :label="$t('BILLING_COMPANY_TAXID_LABEL')"
                      v-on:keyup.enter="submit"
                    >
                    </v-text-field>

                    <v-text-field
                      v-model="restaurant.billingAddress"
                      :rules="validators.requiredRules"
                      @change="validators.requiredRules"
                      :label="$t('BILLING_COMPANY_ADDRESS_LABEL')"
                      v-on:keyup.enter="submit"
                    >
                    </v-text-field>

                    <v-select
                      v-model="restaurant.countryId"
                      :items="countries"
                      item-text="name"
                      item-value="id"
                      :label="$t('BILLING_COMPANY_COUNTRY_LABEL')"
                      :hint="$t('BILLING_COMPANY_COUNTRY_HINT')"
                      persistent-hint
                      :rules="validators.requiredRules"
                      @change="validators.requiredRules"
                    ></v-select>

                    <v-btn color="primary" @click="submit">
                      {{ $t("REGISTER_TITLE") }}
                    </v-btn>

                    <v-btn text @click="step = 2">
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
        <v-row justify="center">
          <a href="https://customenu.ro/" class="mt-5">{{
            $t("BACK_TO_WEBSITE")
          }}</a>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LanguageSelector from "@/components/LanguageSelector.vue";
import axios from "axios";
import EventBus from "@/components/notifications/EventBus";
import validators from "./validators";
import languages from "../../utils/languages";

export default {
  name: "Register",
  components: {
    LanguageSelector,
  },
  data() {
    return {
      validators: validators(this),
      step: 1,
      user: {
        email: "",
        password: "",
      },
      languages,
      countries: [],
      restaurant: {
        logo: "",
        currency: "ron",
        email: "",
        phone: "",
        address: "",
        instagramUrl: "",
        facebookUrl: "",
        youtubeUrl: "",
        languages: ["ro"],
        billingCompanyName: "",
        billingTaxId: "",
        billingAddress: "",
        countryId: 0,
        restaurant_i18ns: [
          {
            lang_code: "ro", // default
            name: "",
            description: "",
            allergens: "",
          },
        ],
        qr_code: "",
      },
    };
  },

  computed: {
    getAppLink() {
      const restaurantPath = this.restaurant.shortUrl
        ? this.restaurant.shortUrl
        : ":link";
      return `https://app.customenu.ro/${restaurantPath}`;
    },
  },

  async created() {
    await this.getCountries();
  },

  methods: {
    async submit() {
      if (this.step === 1 && this.$refs.formStep1.validate()) {
        this.step = 2;
      } else if (this.step === 2 && this.$refs.formStep2.validate()) {
        this.step = 3;
      } else if (this.step === 3 && this.$refs.formStep3.validate()) {
        await axios.post("/auth/register", {
          restaurant: this.restaurant,
          admin: this.user,
        });
        EventBus.$emit("success", this.$t("RESTAURANT_CREATED"));
        this.$router.push({ path: "/login" });
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
      this.restaurant.restaurant_i18ns =
        this.restaurant.restaurant_i18ns.filter((element) =>
          newLanguages.includes(element.lang_code)
        );

      newLanguages.forEach((language) => {
        if (
          !this.restaurant.restaurant_i18ns.some(
            (el) => el.lang_code === language
          )
        ) {
          this.restaurant.restaurant_i18ns.push({
            lang_code: language,
            name: "",
            description: "",
            allergens: "",
          });
        }
      });
    },

    async getCountries() {
      try {
        const { data } = await axios.get(`/countries`);
        this.countries = data;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
