<template>
  <div class="v-catalog-item" @click="toProductPage">
    <vPopup
      v-if="isPopupVisible"
      @closePopup="closeInfoPopup"
      popupRightBtn="Add to cart"
      :popupTitle="product_data.name"
      @rightBtnAction="addToCart"
    >
      <div>
        <img class="v-catalog-item__image" :src=" require('@/assets/images/' + product_data.image) " alt="img">
        <p class="v-catalog-item__name">{{product_data.name}}</p>
        <p class="v-catalog-item__price">Price: {{product_data.price | toFix | formattedPrice}}</p>
        <p class="v-catalog-item__category">{{product_data.category}}</p>
      </div>
    </vPopup>

    <img class="v-catalog-item__image" :src=" require('@/assets/images/' + product_data.image) " alt="img">
    <p class="v-catalog-item__name">{{product_data.name}}</p>
    <p class="v-catalog-item__price">Price: {{product_data.price | toFix | formattedPrice}}</p>
    <button class="v-catalog-item__popup_info" @click="showInfoPopup">Show info</button>
    <button class="v-catalog-item__add_to_cart_btn btn" @click="addToCart">Add Cart</button>
  </div>
</template>

<script>
import vPopup from '../popup/v-popup'
import toFix from '../../filters/toFix'
import formattedPrice from '../../filters/price-format'

export default {
  name: 'v-catalog-item',
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isPopupVisible: false
    }
  },
  components: {
    vPopup
  },
  filters: {
    toFix,
    formattedPrice
  },
  methods: {
    addToCart() {
      this.$emit('addToCart', this.product_data)
    },
    showInfoPopup() {
      this.isPopupVisible = true
    },
    closeInfoPopup() {
      this.isPopupVisible = false
    },
    toProductPage() {
      this.$emit('productPage', this.product_data.article)
    }
  }
}
</script>

<style lang="scss">
  .v-catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;

    &__image {
      width: 100px;
    }
    &__popup_info {
      padding: $padding;
      border: none;
      color: white;
      background-color: rgb(57, 57, 243);
      cursor: pointer;
    }
  }
</style>