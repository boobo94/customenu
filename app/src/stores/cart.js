import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStore', {

  state: () => ({
    products: [],
  }),

  actions: {
    addProduct(product) {
      const productPosition = this.products.findIndex((element) => element.id === product.id);

      if (productPosition === -1) {
        // product not found, add it to the cart
        this.products.push({
          ...product,
          quantity: 1,
        });
      } else { // update only quantity
        this.products[productPosition].quantity++;
      }
    },

    deleteProduct(id) {
      const productPosition = this.products.findIndex(
        (element) => element.id === id && element.quantity > 1,
      );

      if (productPosition === -1) { // quantity is not bigger than 1 so delete it
        this.products = this.products.filter((product) => product.id !== id);
      } else { // update only quantity
        this.products[productPosition].quantity--;
      }
    },

    reset() {
      this.products = [];
    },

    getQuantityOfProduct(id) {
      const product = this.products.find((element) => element.id === id);
      return product?.quantity || 0;
    },

    isCartEmpty() {
      return this.products.length === 0;
    },

    getTotalPriceOfCart() {
      return this.products.reduce(
        (acc, product) => acc + product.quantity * product.price,
        0,
      );
    },

  },
});
