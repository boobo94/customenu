export default {
  namespaced: true,
  state: {
    products: [],
  },
  mutations: {
    add(state, product) {
      state.products.push(product);
    },
    increaseQuantity(state, index) {
      state.products[index].quantity++;
    },
    decreaseQuantity(state, index) {
      state.products[index].quantity--;
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
      const productPosition = state.products.findIndex((element) => element.id === product.id);
      if (productPosition === -1) { // not found, add it
        commit('add', {
          ...product,
          quantity: 1,
        });
      } else { // update only quantity
        commit('increaseQuantity', productPosition);
      }
    },

    delete({ commit, state }, id) {
      const productPosition = state.products.findIndex(
        (element) => element.id === id && element.quantity > 1,
      );

      if (productPosition === -1) { // not found, add it
        commit('delete', id);
      } else { // update only quantity
        commit('decreaseQuantity', productPosition);
      }
    },

    reset({ commit }) {
      commit('reset');
    },
  },
  getters: {
  },
};
