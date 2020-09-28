<template>
  <div class="v-cart">
      <router-link :to="{name: 'catalog'}">
        <div class="v-catalog__cart">Back to catalog</div>
      </router-link>
      <h2>Cart</h2>
      <p v-if="!cart_data.length">There are no products in cart...</p>
      <vCartItem 
        v-for="(item, index) in cart_data"
        :key="item.article"
        :cart_item_data="item"
        @deleteCartItem="deleteCartItem(index)"
        @decrement="decrement(index)"
        @increment="increment(index)"
      />
      <div class="v-cart__total">
        <p class="total-title">Total:</p>
        <p>{{cartTotalCost | toFix | formattedPrice}}</p>
      </div>
  </div>
</template>

<script>
import vCartItem from '@/components/cart/v-cart-item'
import toFix from '../../filters/toFix'
import formattedPrice from '../../filters/price-format'
import {mapActions} from 'vuex'

export default {
  name: 'v-cart',
  props: {
    cart_data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    vCartItem
  },
  filters: {
    toFix,
    formattedPrice
  },
  computed: {
    cartTotalCost() {
      let result = []

      if(this.cart_data.length) {
        for(let item of this.cart_data) {
          result.push(item.price * item.quantity)
        }

        result = result.reduce((sum, el) => {
          return sum + el
        })

        return result
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapActions([
      'DELETE_FROM_CART',
      'DECREMENT_FROM_ITEM',
      'INCREMENT_FROM_ITEM'
    ]),
    decrement(index) {
      this.DECREMENT_FROM_ITEM(index)
    },
    increment(index) {
      this.INCREMENT_FROM_ITEM(index)
    },
    deleteCartItem(index) {
      this.DELETE_FROM_CART(index)
    }
  }
  
}
</script>

<style lang="scss">
  .v-cart {

    &__total {
      display: flex;
      justify-content: center;
      background-color: #26ae68;
      color: #fff;
    }

    .total-title {
      margin: auto $margin;
    }
  }
</style>