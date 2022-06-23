<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <SubscriptionPlans />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12">
        <CompanyPayments />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SubscriptionPlans from "../../components/SubscriptionPlans.vue";
import CompanyPayments from "../../components/CompanyPayments.vue";

export default {
  name: "SubscriptionPage",
  components: {
    SubscriptionPlans,
    CompanyPayments,
  },
};
</script>
