export default {
  name: 'global',
  state: {
    loading: false,
  },
  mutations: {
    showLoading(state, options) {
      //  options = { text:'loading', lock:true } || false || true
      state.loading = options;
    },
    hideLoading(state) {
      state.loading = false;
    },
  },
  actions: {
  },
};
