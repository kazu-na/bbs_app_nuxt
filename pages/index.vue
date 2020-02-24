<template>
  <!-- v-ifを使えばstoreのuserがセットされたら、v-ifで囲っている部分が描画されるようになるので、nameと書いている箇所でエラーが起きることは無くなる -->
  <div v-if="user">
    <p>{{user.name}}</p>
    <AddBoard @submit="addBoard" />
    <BoardList :boards="boards" />
  </div>
</template>

<script>
import AddBoard from "@/components/AddBoard";
import BoardList from "@/components/BoardList";

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
  data(){
    return {
      boards: []
    };
  },
  methods: {
    addBoard(title) {
      this.boards.push({
        title
      });
    }
  }
};
</script>

<style>
</style>