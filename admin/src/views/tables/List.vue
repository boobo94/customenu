<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="elements"
          class="elevation-1"
          :loading="isLoading"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>{{ $t("TABLES_TITLE") }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                fab
                dark
                color="blue"
                :to="{ path: `${$route.path}create` }"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">{{
                    $t("DELETE_CONFIRMATION_QUESTION")
                  }}</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialogDelete = false"
                      >{{ $t("DELETE_CONFIRMATION_CANCEL") }}</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.qrCode`]="{ item }">
            <v-icon class="ml-2 mr-2" @click="download(item)">
              mdi-download
            </v-icon>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ListTables",

  data() {
    return {
      isLoading: true,
      elements: [],
      dialogDelete: false,
      selectedItem: null,
      tablesApiUrl: "",
      headers: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: this.$t("NAME"), value: "name" },
        {
          text: "QR Code",
          align: "center",
          value: "qrCode",
          sortable: false,
          width: 100,
        },
        {
          text: this.$t("ACTIONS"),
          align: "center",
          value: "actions",
          sortable: false,
          width: 100,
        },
      ],
    };
  },

  async created() {
    const { restaurantId } = this.$store.state.authModule;
    this.tablesApiUrl = `/restaurants/${restaurantId}/tables`;
    const { data } = await axios.get(this.tablesApiUrl);

    this.isLoading = false;
    this.elements = data;
  },

  methods: {
    async download(selectedItem) {
      const response = await axios.get(
        `${this.tablesApiUrl}/${selectedItem.id}/download`,
        { responseType: "blob" }
      );
      if (response.data.error) {
        console.error(response.data.error);
      }

      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement("a");
      fileLink.href = fileURL;
      const fileName = `table-${selectedItem.name}.png`;
      fileLink.setAttribute("download", fileName);
      fileLink.setAttribute("target", "_blank");
      document.body.appendChild(fileLink);
      fileLink.click();
      fileLink.remove();
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.selectedItem = item;
    },

    async deleteItemConfirm() {
      await axios.delete(`${this.tablesApiUrl}/${this.selectedItem.id}`);

      this.elements = this.elements.filter(
        (element) => element.id !== this.selectedItem.id
      );
      this.dialogDelete = false;
    },
  },
};
</script>
