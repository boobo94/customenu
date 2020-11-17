<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>{{ $t("LOGIN_TITLE") }}</v-toolbar-title>
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
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="user.password"
                    :rules="validators.passwordValidator"
                    :label="$t('PASSWORD_LABEL')"
                    name="user.password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="primary">{{
                  $t("LOGIN_TITLE")
                }}</v-btn>
              </v-card-actions>
            </v-card>
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
      user: {
        email: '',
        password: '',
      },
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('authModule/login', this.user).then(() => {
          this.$router.push({ path: '/' });
        });
      }
    },
  },
};
</script>
