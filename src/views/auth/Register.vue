<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>{{ $t("REGISTER_TITLE") }}</v-toolbar-title>
            </v-toolbar>

            <v-form ref="form">
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

                    <v-btn color="primary" @click="step = 2">
                      {{ $t("CONTINUE_TITLE") }}
                    </v-btn>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <v-card
                      class="mb-12"
                      color="grey lighten-1"
                      height="200px"
                    ></v-card>

                    <v-btn color="primary" @click="submit">
                      {{ $t("REGISTER_TITLE") }}
                    </v-btn>

                    <v-btn text @click="step = 1">
                      {{ $t("BACK_TITLE") }}
                    </v-btn>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-form>

            <!-- <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>{{ $t("REGISTER_TITLE") }}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
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
                </v-form>
              </v-card-text>
              <v-card-actions>
                <router-link :to="{ name: 'Login' }"
                  >{{ $t("LOGIN_TITLE") }}
                </router-link>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="primary">{{
                  $t("REGISTER_TITLE")
                }}</v-btn>
              </v-card-actions>
            </v-card> -->
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
import validators from './validators';

export default {
  data() {
    return {
      validators: validators(this),
      step: 1,
      user: {
        email: '',
        password: '',
      },
      restaurant: {
        logo: '',
        currency: '',
        email: '',
        phone: '',
        instagramUrl: '',
        facebookUrl: '',
        youtubeUrl: '',
        restaurant_i18ns: [],
        qr_code: '',
      },
    };
  },

  methods: {
    submit() {
      alert('SUBMITED');
      // if (this.$refs.form.validate()) {
      //   this.$store.dispatch('authModule/register', this.user).then(() => {
      //     this.$router.push({ path: '/' });
      //   });
      // }
    },
  },
};
</script>
