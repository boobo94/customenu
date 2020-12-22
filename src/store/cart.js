export default {
  namespaced: true,
  state: {
    products: [
      // todo: remove these
      {
        id: 1, image: 'https://digital-menu.eu-central-1.linodeobjects.com/restaurant-1/products/1606514757394.jpeg', weight: 350, price: 45, name: 'Carnati', description: 'Coaste de purcel, salata coleslaw, sos, castraveti murati, paine brioche, (~400Gr.MEAT). (Alergeni: gluten,oua,lapte,susan,mustar)',
      },
      {
        id: 3, image: 'https://digital-menu.eu-central-1.linodeobjects.com/restaurant-1/products/1606514757394.jpeg', weight: 350, price: 45, name: 'Coaste', description: 'Coaste de purcel, salata coleslaw, sos, castraveti murati, paine brioche, (~400Gr.MEAT). (Alergeni: gluten,oua,lapte,susan,mustar)',
      },

    ],
  },
  mutations: {
    add(state, product) {
      state.products = product;
    },
    delete(state, index) {
      state.products.splice(index, 1);
    },
    reset(state) {
      state.products = [];
    },
  },
  actions: {
    addToCart({ commit }, product) {
      commit('add', product);
    },

    delete({ commit }, index) {
      commit('delete', index);
    },

    reset({ commit }) {
      commit('reset');
    },
  },
  getters: {
  },
};
