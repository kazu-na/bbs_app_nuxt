<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="title" :counter="10" label="スレッド名を入力" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn @click="handleSubmit">新規作成</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      title: ""
    };
  },
  methods: {
    handleSubmit() {
      const board = {
        title: this.title,
        user_id: this.user.id,
      };
      this.$emit("submit", board);
      this.title = "";
    }
  }
};
</script>

<style>
</style>