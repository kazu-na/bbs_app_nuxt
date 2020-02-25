<template>
  <!-- v-ifを使えばstoreのuserがセットされたら、v-ifで囲っている部分が描画されるようになるので、nameと書いている箇所でエラーが起きることは無くなる -->
  <div v-if="user">
    <p>{{user.name}}</p>
    <li class="errors" v-for="(error, i) in errors" :key="i">{{error}}</li>
    <AddBoard @submit="addBoard" />
    <BoardList :boards="user.boards" />
  </div>
</template>

<script>
import AddBoard from "@/components/AddBoard";
import BoardList from "@/components/BoardList";
import axios from "@/plugins/axios";
export default {
  components: {
    AddBoard,
    BoardList
  },
  // ストアにある状態をコンポーネント内で引き出す(算出プロパティで返す)
  // これでtemplate内では”user",script内では"this.user"で呼び出せるようになる
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
    errors() {
      return this.$store.state.errors;
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
        console.log({ newUser });
        if (!newUser) {
          return redirect("/login");
        }
      }
    );
  },
  methods: {
    async addBoard(board) {
      try {
        const { data } = await axios.post("/v1/boards", { board });
        this.$store.commit("setUser", {
          ...this.user,
          boards: [...this.user.boards, data]
        });
        this.$store.commit("clearErrors");
      } catch (error) {
        const { status } = error.response;
        if (status === 422) {
          this.$store.commit("setError", "タイトルが空です");
        }
      }
    }
  },
  destroyed() {
    this.$store.commit("clearErrors");
  }
};
</script>

<style scoped>
.errors {
  color: "red";
}
</style>