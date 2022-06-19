<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2>{{ $t("SUBSCRIPTION_PLANS_LABEL") }}</h2>
      </v-col>

      <v-col cols="4" v-for="plan of subscriptionPlans" :key="plan.id">
        <v-card class="mx-auto" outlined :loading="isLoading">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                {{ plan.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("SUBSCRIPTION_PRICE_LABEL") }} {{ plan.amount }}
                {{ plan.currency }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ $t("SUBSCRIPTION_RECURRING_LABEL") }} {{ plan.recurrence }}/{{ plan.interval }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ $t("SUBSCRIPTION_MAX_CATEGORIES_LABEL") }}
                {{ plan.maxCategories }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ $t("SUBSCRIPTION_MAX_PRODUCTS_LABEL") }}
                {{ plan.maxProducts }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn
              v-if="activeSubscription.subscriptionPlanId !== plan.id"
              outlined
              rounded
              text
              color="primary"
              @click="orderSubscription(plan)"
            >
              {{ $t("SUBSCRIPTION_BUY_BUTTON") }}
            </v-btn>

            <v-btn
              v-if="activeSubscription.subscriptionPlanId === plan.id"
              :disabled="activeSubscription.canceled"
              outlined
              rounded
              text
              color="red"
              @click="closeSubscription(plan)"
            >
              {{ $t("SUBSCRIPTION_CANCEL_BUTTON") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SubscriptionPlans",

  data: () => ({
    subscriptionPlans: [],
    activeSubscription: {
      id: 0,
    },
    isLoading: false,
  }),

  async created() {
    await this.getSubscriptionPlans();
    await this.getActiveSubscription();
  },

  methods: {
    async getSubscriptionPlans() {
      const { restaurantId } = this.$store.state.authModule;
      try {
        const { data } = await axios.get(
          `/restaurants/${restaurantId}/subscriptions/plans`
        );
        this.subscriptionPlans = data;
      } catch (e) {
        console.error(e);
      }
    },

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
      if (confirm(this.$t("CANCEL_SUBSCRIPTION_CONFIRMATION_QUESTION"))) {
        this.isLoading = true;
        const { restaurantId } = this.$store.state.authModule;
        try {
          // cancel the subscription
          await axios.delete(
            `/restaurants/${restaurantId}/subscriptions/${this.activeSubscription.id}`
          );

          // get the active subscription
          setTimeout(async () => {
            await this.getActiveSubscription();
            this.isLoading = false;
          }, 3000);
        } catch (e) {
          console.error(e);
        }
      }
    },

    async orderSubscription(plan) {
      // check if the user has an active subscription which is not canceled yet
      if (this.activeSubscription.id && !this.activeSubscription.canceled) {
        alert(this.$t("SUBSCRIPTION_ALREADY_ACTIVE_ALERT"));
      } else if (
        // check if the user doesn't have an active subscription or the active subscription is canceled
        !this.activeSubscription.id ||
        (this.activeSubscription.id && this.activeSubscription.canceled)
      ) {
        try {
          const { restaurantId } = this.$store.state.authModule;
          // order this subscription
          const { data } = await axios.post(
            `/restaurants/${restaurantId}/subscriptions`,
            {
              referenceId: plan.referenceId,
            }
          );

          // get the payment url froms stripe and create a new plan
          if (data.url) {
            window.open(data.url, "_self");
          }
        } catch (e) {
          console.error(e);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
