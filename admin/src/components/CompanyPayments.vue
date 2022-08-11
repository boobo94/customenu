<template>
  <div>
    <h2>{{ $t("SUBSCRIPTION_PAYMENTS_LABEL") }}</h2>

    <v-data-table :headers="headers" :items="payments" :items-per-page="5" class="company-subscription-payments-table">
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getStatusChipColor(item.status)" dark>
          {{ getStatusText(item.status) }}
        </v-chip>
      </template>

      <template v-slot:[`item.createdAt`]="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>

      <template v-slot:[`item.amount`]="{ item }">
        {{ item.amount }} {{ item.currency.toUpperCase() }}
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn text v-if="item.status === 'paid'" @click="downloadInvoice(item.id)">
          <v-icon> mdi-download </v-icon>{{ $t("DOWNLOAD_INVOICE") }}
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import { DateTime } from "luxon";

export default {
  name: "CompanyPayments",

  components: {},

  data() {
    return {
      payments: [],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "id",
        },
        {
          text: this.$t("DATE"),
          align: "start",
          sortable: true,
          value: "createdAt",
        },
        {
          text: this.$t("STATUS"),
          align: "start",
          sortable: true,
          value: "status",
        },
        {
          text: this.$t("AMOUNT"),
          align: "start",
          sortable: true,
          value: "amount",
        },

        {
          text: this.$t("VAT"),
          align: "start",
          sortable: true,
          value: "vatAmount",
        },

        {
          text: this.$t("INVOICE"),
          align: "center",
          sortable: true,
          value: "actions",
        },
      ],
    };
  },

  created() {
    this.getPayments();
  },

  methods: {
    async getPayments() {
      const { restaurantId } = this.$store.state.authModule;
      try {
        const { data } = await axios.get(
          `/restaurants/${restaurantId}/payments/me`
        );
        this.payments = data;
      } catch (e) {
        console.error(e);
      }
    },

    getStatusChipColor(status) {
      switch (status) {
        case "paid":
          return "success";
        case "failed":
          return "error";
        case "pending":
        default:
          return "warning";
      }
    },

    getStatusText(status) {
      switch (status) {
        case "paid":
          return this.$t("PAYMENT_STATUS_ACCEPTED");
        case "failed":
          return this.$t("PAYMENT_STATUS_REJECTED");
        case "pending":
        default:
          return this.$t("PAYMENT_STATUS_PENDING");
      }
    },

    async downloadInvoice(paymentId) {
      const { restaurantId } = this.$store.state.authModule;

      try {
        const response = await axios.get(
          `/restaurants/${restaurantId}/payments/${paymentId}/export-invoice`,
          { responseType: "blob" }
        );

        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement("a");
        fileLink.href = fileURL;
        const fileName = `payment-${paymentId}.pdf`;
        fileLink.setAttribute("download", fileName);
        fileLink.setAttribute("target", "_blank");
        document.body.appendChild(fileLink);
        fileLink.click();
        fileLink.remove();

      } catch (e) {
        console.error(e);
      }
    },

    formatDate(value) {
      return DateTime.fromISO(value).toFormat("dd LLL yyyy HH:mm");
    },
  },
};
</script>

<style scoped lang="scss">
</style>
