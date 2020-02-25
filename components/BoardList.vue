<template>
  <v-card>
    <v-card-title>
      掲示板一覧
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="検索" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="boards" :search="search">
      <template v-slot:item.action="{ item }">
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  props: ["boards"],
  data() {
    return {
      singleSelect: true,
      selected: [],
      search: "",
      headers: [
        {
          text: "タイトル",
          align: "left",
          sortable: false,
          value: "title"
        },
        { text: "ユーザー名", value: "username" },
        { text: "Actions", value: "action", sortable: false }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    async deleteItem(item) {
      const res = confirm("本当に削除しますか？");
      if (res) {
        await axios.delete(`/v1/boards/${item.id}`);
        const boards = this.user.boards.filter(board => {
          return board.id !== item.id;
        });
        const newUser = {
          ...this.user,
          boards
        };
        this.$store.commit("setUser", newUser);
      }
    }
  }
};
</script>

<style>
</style>