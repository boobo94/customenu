<template>
  <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" top>
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
        {{ $t("CLOSE") }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import EventBus from './EventBus';

export default {
  data: () => ({
    snackbar: false,
    text: '',
    color: '',
    timeout: 10000
  }),

  created() {
    EventBus.$on('error', (data) => {
      this.snackbar = true;
      this.text = data;
      this.color = 'error';
    });

    EventBus.$on('success', (data) => {
      this.snackbar = true;
      this.text = data;
      this.color = 'success';
    });
  },
};
</script>
