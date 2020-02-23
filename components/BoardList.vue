<template>
  <v-card>
    <v-card-title>
      掲示板
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="boards" :search="search"></v-data-table>
  </v-card>
</template>

<script>
export default {
  props: ["boards"],
  data() {
    return {
      search: "",
      headers: [
        {
          text: "タイトル",
          align: "left",
          sortable: false,
          value: "title"
        },
        { text: "ユーザー名", value: "username" },
      ]
    };
  }
};
</script>

<style>
</style>