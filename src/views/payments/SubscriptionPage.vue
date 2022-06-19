<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <SubscriptionPlans
          v-if="activeSubscription.id === 0 || activeSubscription.canceled"
        />

        <div v-if="activeSubscription.id !== 0">
          Active subscription

          <p v-if="activeSubscription.canceled">
            Subscription is canceled at the end of the period
          </p>
          <v-btn v-if="!activeSubscription.canceled" @click="closeSubscription"
            >Cancel subscription</v-btn
          >
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <CompanyPayments />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SubscriptionPlans from "../../components/SubscriptionPlans.vue";
import axios from "axios";
import CompanyPayments from "../../components/CompanyPayments.vue";

export default {
  name: "SubscriptionPage",
  components: {
    SubscriptionPlans,
    CompanyPayments,
  },
  data() {
    return {
      isLoading: true,
      activeSubscription: {
        id: 0,
      },
      productsApiUrl: "",
    };
  },

  async created() {
    await this.getActiveSubscription();
  },

  methods: {
    async getActiveSubscription() {
      const { restaurantId } = this.$store.state.authModule;
      try {
        const { data } = await axios.get(
          `/restaurants/${restaurantId}/subscriptions/me`
        );
        this.activeSubscription = data;
      } catch (e) {
        console.error(e);
      }
    },
    async closeSubscription() {
      const { restaurantId } = this.$store.state.authModule;
      try {
        // cancel the subscription
        await axios.delete(
          `/restaurants/${restaurantId}/subscriptions/${this.activeSubscription.id}`
        );

        // get the active subscription
        await this.getActiveSubscription();
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
