<template>
  <h1>title</h1>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  components: {
  },
  // ストアにある状態をコンポーネント内で引き出す(算出プロパティで返す)
  // これでtemplate内では”user",script内では"this.user"で呼び出せるようになる
  computed: {
    user() {
      return this.$store.state.currentUser;
    }
  },
  data() {
    return {};
  },
  // ログインしていないユーザーはログイン画面にリダイレクトさせるようにする
  fetch({ store, redirect }) {
    store.watch(
      state => state.currentUser,
      (newUser, oldUser) => {
        if (!newUser) {
          return redirect("/login");
        }
      }
    );
  },
  methods: {
  }
};
</script>

<style scoped>
.errors {
  color: "red";
}
</style>