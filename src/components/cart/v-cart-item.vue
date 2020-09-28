<template>
  <div class="v-cart-item">
    <img class="v-cart-item__image" :src=" require('@/assets/images/' + cart_item_data.image) " alt="img">
    <div class="v-cart-item__info">
      <p>{{cart_item_data.name}}</p>
      <p>Price: {{cart_item_data.price | toFix | formattedPrice}}</p>
      <p>{{cart_item_data.article}}</p>
    </div>
    <div class="v-cart-item_quantity">
      <p>Quantity:</p>
      <span class="btn-quantity" @click="decrementItem">-</span>
      {{cart_item_data.quantity}}
      <span class="btn-quantity" @click="incrementItem">+</span>
    </div>
    <button @click="deleteCartItem">Delete</button>
  </div>
</template>

<script>
import toFix from '../../filters/toFix'
import formattedPrice from '../../filters/price-format'

export default {
  name: 'v-cart-item',
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    this.$set(this.cart_item_data, 'quantity', 1)
  },
  filters: {
    toFix,
    formattedPrice
  },
  methods: {
    decrementItem() {
      this.$emit('decrement')
    },
    incrementItem() {
      this.$emit('increment')
    },
    deleteCartItem() {
      this.$emit('deleteCartItem')
    }
  }
}
</script>

<style lang="scss">
  .v-cart-item {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;

    &__image {
      max-width: 100px;
    }

    .btn-quantity {
      padding: 0 5px;
      cursor: pointer;
      background-color: bisque;
    }
  }
</style>