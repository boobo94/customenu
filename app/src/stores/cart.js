import { defineStore } from 'pinia'

export const useCartStore = defineStore('cartStore', {

  state: () => ({
    products: [],
  }),

  actions: {
    addProduct(product) {
      console.log('add')
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

      console.log(this.products)
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
      this.products = []
    },
  }
})
