<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    v-model="user.email"
                    :rules="validators.emailValidator"
                    @change="validators.emailValidator"
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="email"
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="user.password"
                    :rules="validators.passwordValidator"
                    label="Password"
                    name="user.password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import * as validators from './validators';

export default {
  data() {
    return {
      validators,
      user: {
        email: '',
        password: '',
      },
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('authModule/login', this.user)
          .then(() => {
            this.$router.push({ path: '/' });
          });
      }
    },
  },
};
</script>
