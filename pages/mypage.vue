<template>
  <div>
    <div v-if="user">
      <p>Email: {{user.email}}</p>
      <p>ユーザー名: {{user.name}}</p>
    </div>
    <v-btn @click="logOut">ログアウト</v-btn>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
import axios from "@/plugins/axios";

export default {
  computed: {
    user() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("setNotice", {
            status: true,
            message: "ログアウトしました"
          });
          //2秒後に隠す
          setTimeout(() => {
            this.$store.commit("setNotice",{});
          }, 2000);
          this.$store.commit("setUser", null);
          this.$router.push("/login");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>