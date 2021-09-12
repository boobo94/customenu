<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
    :loading="isLoading"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn fab dark color="blue" @click="save">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">{{
              $t("DELETE_CONFIRMATION_QUESTION")
            }}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">{{
                $t("DELETE_CONFIRMATION_CANCEL")
              }}</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="ml-2 mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TableElements',
  props: {
    tableTitle: String,
    elements: Array,
    isLoading: Boolean,
    apiUrl: String,
  },

  data() {
    return {
      dialogDelete: false,
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: this.$t('NAME'), value: 'name' },
        {
          text: this.$t('ACTIONS'),
          align: 'center',
          value: 'actions',
          sortable: false,
          width: 200,
        },
      ],
      selectedItem: null,
      items: [],
    };
  },

  watch: {
    elements(newValue) {
      this.items = newValue;
    },
  },

  methods: {
    editItem(item) {
      this.$router.push({ path: `${this.$route.path}${item.id}/edit` });
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.selectedItem = item;
    },

    async deleteItemConfirm() {
      await axios.delete(`${this.apiUrl}/${this.selectedItem.id}`);

      this.items = this.items.filter(
        (element) => element.id !== this.selectedItem.id,
      );
      this.closeDelete();
    },

    close() {
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    save() {
      this.$router.push({ path: `${this.$route.path}create` });
    },

  },
};
</script>

<style scoped>
/* Define styles here */
</style>
