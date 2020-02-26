<template>
  <!-- v-ifを使えばstoreのuserがセットされたら、v-ifで囲っている部分が描画されるようになるので、nameと書いている箇所でエラーが起きることは無くなる -->
  <div v-if="user">
    <p>{{user.name}}</p>
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
    async addBoard(board) {
      const { data } = await axios.post("/v1/boards", { board });
      this.$store.commit("setNotice", {
        status: true,
        message: "投稿しました"
      });
      //2秒後に隠す
      setTimeout(() => {
        this.$store.commit("setNotice",{});
      }, 2000);
      this.$store.commit("setUser", {
        ...this.user,
        boards: [...this.user.boards, data]
      });
    }
  }
};
</script>

<style>
</style>