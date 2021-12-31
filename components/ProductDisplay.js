app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    cart: {
      type: Object,
      required: true
    }
  },
  template:
    /*html*/
    `<div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img :src="image" :class="[inventory == 0 ? 'out-of-stock-img' : '']" />
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
          <p v-if="inventory > 10">In Stock</p>
          <p v-else-if="inventory <= 10 && inventory > 0">Almost Sold out!</p>
          <p v-else>Out of Stock</p>
          <p v-if="onSale">on Sale</p>
          <p v-else>Sale Ended</p>

          <p>Shipping {{ shipping }}</p>

          <product-details :details="details"></product-details>
          
          <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)"
          class="color-circle" :style="{ backgroundColor: variant.color}">
          </div>
          <div>
            <span v-for="size in sizes">{{ size }}, </span>
          </div>
          <!-- <button class="button" v-on:click="addToCart">Add to Cart</button> -->
          <button class="button" :class="{ disabledButton: inventory < 1}" @click="addToCart"
            :disabled="inventory < 1">Add to Cart</button>
          <button v-if="cart[this.variants[this.selectedIndex].id] > 0" class="button" @click="removeFromCart">Remove from Cart</button>
        </div>
      </div>
      <div :style="{ display: 'flex', justifyContent: 'space-between'}">
      <review-form @review-submitted="addReview"></review-form>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      </div>
    </div>`,
  data: function () {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      description: 'Made with fine wool',
      selectedIndex: 0,
      onSale: false,
      details: ['50% cotton', '30% wool', '20% polyester'],
      variants: [
        { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
        { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 3 }
      ],
      sizes: ['XS', 'S', 'L', 'M', 'XL', 'XXL'],
      reviews: []
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedIndex].id);
      this.variants[this.selectedIndex].quantity -= 1;
    },
    removeFromCart() {
      if (this.cart[this.variants[this.selectedIndex].id] > 0) {
        this.$emit('remove-from-cart', this.variants[this.selectedIndex].id);
        this.variants[this.selectedIndex].quantity += 1;
      }
    },
    updateVariant(index) {
      this.selectedIndex = index;
    },
    addReview(review) {
      this.reviews.push(review);
    }
  },
  computed: {
    title() {
      if (this.onSale) {
        return `${this.brand} ${this.product} is on sale`;
      } else {
        return this.brand + ' ' + this.product;
      }
    },
    image() {
      return this.variants[this.selectedIndex].image;
    },
    inventory() {
      return this.variants[this.selectedIndex].quantity;
    },
    shipping() {
      if (this.premium) {
        return 'Free';
      }
      return 2.99;
    }
  }
});