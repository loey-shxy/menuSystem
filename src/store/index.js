import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => {
    return {
      userInfo: {
        userType: 1
      },
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    }
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    }
  }
})