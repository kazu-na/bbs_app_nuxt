import firebase from "@/plugins/firebase"
import axios from "@/plugins/axios"

// ログイン状態はVuexに保持
// Vuexのstoreはpropsと同様にリロードすると壊れる
// nuxt.config.jsのpluginsに追加するとリロードする度に毎回呼んでくれる
// storeディレクトリの中のindex.jsに記述
const authCheck = ({ store, redirect }) => {
  firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      const { data } = await axios.get(`/v1/users?uid=${user.uid}`)
      store.commit("setUser", data)
    } else {
      store.commit("setUser", null)
    }
});
}

export default authCheck