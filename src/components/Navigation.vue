<template>
  <div>
    <v-navigation-drawer v-model="drawer" app fixed>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              <v-icon>mdi-account</v-icon>Admin
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <template v-for="(item, index) in items">
          <v-list-item
            color="primary"
            :key="index"
            :href="item.href"
            :to="{ name: item.href }"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="secondary" @click="logout"> Logout </v-btn>
        </div>
        <div block>
          <LocaleSwitch />
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app class="primary lighten-1">
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="empty-button-size">
        <v-btn icon @click="goBack" v-if="!isHomePage()">
          <v-icon color="white">mdi-arrow-left</v-icon>
        </v-btn>
      </div>
      <v-toolbar-title class="white--text">Application</v-toolbar-title>

      <!-- <v-spacer></v-spacer>

      <LocaleSwitch /> -->
    </v-app-bar>
  </div>
</template>

<script>
import LocaleSwitch from '@/components/LocaleSwitch.vue';

export default {
  name: 'Navigation',
  props: {},
  components: {
    LocaleSwitch,
  },
  data() {
    return {
      drawer: null,
      items: [
        {
          href: 'List Categories',
          router: true,
          title: this.$t('CATEGORIES_TITLE'),
          icon: 'mdi-shape',
        },
      ],
    };
  },
  created() {},
  methods: {
    goBack() {
      return window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/');
    },
    isHomePage() {
      return this.$route.name === 'Home';
    },
    logout() {
      this.$store.dispatch('authModule/logout');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style scoped>
.empty-button-size {
  width: 48px;
  height: 48px;
}
</style>
