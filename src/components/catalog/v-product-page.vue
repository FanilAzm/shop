<template>
  <div class="v-product-page">
      <img v-if="product.image" class="v-catalog-item__image" :src=" require('@/assets/images/' + product.image) " alt="img">
      <p>Product name: {{product.name}}</p>
      <p>Article: {{product.article}}</p>
      <p class="v-catalog-item__price">Price: {{product.price | toFix | formattedPrice}}</p>
      <button class="v-catalog-item__add_to_cart_btn btn" @click="addToCart">Add Cart</button>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import toFix from '../../filters/toFix'
import formattedPrice from '../../filters/price-format'

export default {
    filters: {
        toFix,
        formattedPrice
    },
    computed: {
        ...mapGetters([
            'PRODUCTS'
        ]),
        product() {
            let result = {}
            let vm = this
            this.PRODUCTS.map(item => {
                if(item.article === vm.$route.query.product) {
                    result = item
                }
            })
            return result
        }
    },
    methods: {
        ...mapActions([
            'GET_PRODUCTS_FROM_API',
            'ADD_TO_CART'
        ]),
        addToCart() {
            this.ADD_TO_CART(this.product)
        },
    },
    mounted() {
        this.GET_PRODUCTS_FROM_API()
    }
}
</script>

<style>

</style>