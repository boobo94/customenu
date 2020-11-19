<template>
  <v-row>
    <v-col>
      <v-tabs v-model="currentItem" fixed-tabs background-color="primary" dark>
        <v-tab
          v-for="item in items"
          :key="item.lang_code"
          :href="'#tab-' + item.lang_code"
        >
          {{ item.lang_code }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="currentItem">
        <v-tab-item
          v-for="item in items"
          :key="item.lang_code"
          :value="'tab-' + item.lang_code"
        >
          <v-card flat>
            <v-card-text>
              <v-text-field
                v-model="item.name"
                :counter="255"
                :label="$t('NAME')"
                :rules="nameRules"
                required
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CategoryI18n',
  props: {
    items: Array,
  },
  data() {
    return {
      currentItem: 'tab-ro',
      nameRules: [(v) => !!v || this.$t('REQUIRED_NAME')],
    };
  },
  methods: {},
};
</script>

<style scoped>
/* Define styles here */
</style>
