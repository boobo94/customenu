<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="admin.email"
            :label="$t('EMAIL_LABEL')"
            :rules="validators.emailValidator"
            prepend-icon="mdi-account"
            type="email"
            :counter="255"
          >
          </v-text-field>

          <v-text-field
            v-model="admin.password"
            :label="$t('PASSWORD_LABEL')"
            prepend-icon="mdi-lock"
            type="password"
            :counter="255"
          ></v-text-field>

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
import validators from './validators';
import EventBus from '../../components/notifications/EventBus';

export default {
  name: 'EditAdmin',
  data() {
    return {
      valid: true,
      validators: validators(this),
      admin: {
        email: '',
        password: '',
      },
      apiUrl: '',
    };
  },
  async created() {
    this.apiUrl = '/auth/profile';
    const { data } = await axios.get(this.apiUrl);

    this.admin = data;
  },

  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        await axios.put(this.apiUrl, this.admin);
        EventBus.$emit('success', this.$t('SUCCESS_OPERATION'));
        this.$store.dispatch('authModule/setLanguages');
      }
    },
  },
};
</script>

<style>
</style>
