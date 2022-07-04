<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="table.name"
            :label="$t('NAME')"
            required
            :rules="requiredRules"
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
import axios from "axios";

export default {
  name: "CreateCategory",
  components: {},
  data() {
    return {
      valid: true,
      requiredRules: [(v) => !!v || this.$t("REQUIRED_FIELD")],
      table: {
        name: "",
      },
    };
  },

  created() {},

  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        const { restaurantId } = this.$store.state.authModule;
        await axios.post(`/restaurants/${restaurantId}/tables`, this.table);
        this.$router.go(-1);
      }
    },
  },
};
</script>
