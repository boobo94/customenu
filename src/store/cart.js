export default {
  namespaced: true,
  state: {
    products: [],
  },
  mutations: {
    add(state, product) {
      state.products.push(product);
    },
    updateQuantity(state, index) {
      state.products[index].quantity++;
    },
    delete(state, id) {
      state.products = state.products.filter((product) => product.id !== id);
    },
    reset(state) {
      state.products = [];
    },
  },
  actions: {
    add({ commit, state }, product) {
      const productPosition = state.products.indexOf((element) => element.id === product.id);
      if (productPosition === -1) { // not found, add it
        commit('add', {
          ...product,
          quantity: 1,
        });
      } else { // update only quantyty
        commit('updateQuantity', productPosition);
      }
    },

    delete({ commit }, id) {
      commit('delete', id);
    },

    reset({ commit }) {
      commit('reset');
    },
  },
  getters: {
  },
};
