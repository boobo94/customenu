<template>
  <v-container>
    <v-row>
      <v-col cols="4" v-for="plan of subscriptionPlans" :key="plan.id">
        {{ plan.name }}
        {{ plan.amount }} {{ plan.currency }} {{ plan.recurrence }}/{{
          plan.interval
        }}

        <v-btn @click="orderSubscription(plan)">buy</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "SubscriptionPlans",

  components: {},

  data: () => ({
    subscriptionPlans: [],
  }),

  async created() {
    const { restaurantId } = this.$store.state.authModule;
    const { data } = await axios.get(
      `/restaurants/${restaurantId}/subscriptions/plans`
    );
    this.subscriptionPlans = data;
  },

  methods: {
    async orderSubscription(plan) {
      console.log(plan);

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
          window.open(data.url, "_blank");
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
