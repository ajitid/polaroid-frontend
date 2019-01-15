const auth = {
  state: {
    accessToken: null
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    }
  }
};

export default auth;
