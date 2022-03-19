import { defineStore } from "pinia";

interface UserStore {
  user: [];
  isLoggedIn: boolean;
}

export const useLoggedInUserStore = defineStore({
  id: "userStore",
  state: (): UserStore => ({ user: [], isLoggedIn: false }),
  getters: {},
  actions: {},
});
