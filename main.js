const app = Vue.createApp({
  data: function () {
    return {
      cart: {},
      premium: false
    }
  },
  methods: {
    updateCart(id) {
      if(this.cart.hasOwnProperty(id)) {
        this.cart[id] = this.cart[id] + 1;
      } else {
        this.cart[id] = 1;
      }
    },
    deleteCart(id) {
      if (this.cart[id] > 0) {
        this.cart[id] = this.cart[id] - 1;
      }
    },
  },
  computed: {}
});