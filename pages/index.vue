<template>
  <div>
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
  data(){
    return {
      boards: []
    }
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