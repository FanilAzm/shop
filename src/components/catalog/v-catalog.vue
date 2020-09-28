<template>
  <div class="v-catalog">
      <vNotification 
        :messages="messages"
        :timeout="5000"
      />

      <router-link :to="{name: 'cart', params: {cart_data: CART}}">
        <div class="v-catalog__cart">Cart: {{CART.length}}</div>
      </router-link>
      <h2>Catalog</h2>
      <div class="filters">
        <vSelect 
            :options="categories"
            :selected="selected"
            @select="sortCategories"
            :isExpanded="IS_DESKTOP"
        />
        <div class="range-slider">
            <input type="range" min="0" max="10000" step="100" v-model.number="minPrice" @change="setRangeSlider">
            <input type="range" min="0" max="10000" step="100" v-model.number="maxPrice" @change="setRangeSlider">
        </div>
        <div class="range-value">
            <p>Min: {{minPrice}}</p>
            <p>Max: {{maxPrice}}</p>
        </div>
      </div>
      <div class="v-catalog__list">
          <vCatalogItem 
            v-for="product in filterProducts"
            :key="product.article"
            :product_data="product"
            @addToCart="addToCart"
            @productPage="productPage"
          />
      </div>
  </div>
</template>

<script>
import vCatalogItem from '@/components/catalog/v-catalog-item'
import vSelect from '@/components/v-select'
import { mapActions, mapGetters } from 'vuex'
import vNotification from '../notifications/v-notification'

export default {
    name: 'v-catalog',
    components: {
        vCatalogItem,
        vSelect,
        vNotification
    },
    data() {
        return {
            categories: [
                {name: 'Все', value: 'all'},
                {name: 'Мужские', value: 'man'},
                {name: 'Женские', value: 'woman'}
            ],
            selected: 'Все',
            sortedProducts: [],
            minPrice: 0,
            maxPrice: 10000,
            messages: []
        }
    },
    computed: {
        ...mapGetters([
            'PRODUCTS',
            'CART',
            'IS_MOBILE',
            'IS_DESKTOP',
            'SEARCH_VALUE'
        ]),
        filterProducts() {
            if(this.sortedProducts.length) {
                return this.sortedProducts
            } else {
                return this.PRODUCTS
            }
        }
    },
    methods: {
        ...mapActions([
            'GET_PRODUCTS_FROM_API',
            'ADD_TO_CART'
        ]),
        addToCart(data) {
            this.ADD_TO_CART(data)
                .then(() => {
                    let timeStamp = Date.now().toLocaleString()
                    this.messages.unshift(
                        {name: 'Товар добавлен в корзину', icon: 'check_circle', id: timeStamp}
                    )
                })
        },
        sortCategories(category) {
            // this.sortedProducts = []

            // let vm = this
            // this.PRODUCTS.map(item => {
            //     if(item.category === category.name) {
            //         vm.sortedProducts.push(item)
            //     }
            // })

            // this.selected = category.name
            let vm = this

            this.sortedProducts = [...this.PRODUCTS]
            this.sortedProducts = this.sortedProducts.filter(item => {
                return item.price >= vm.minPrice && item.price <= vm.maxPrice
            })

            if(category) {
                
                this.sortedProducts = this.sortedProducts.filter(item => {
                    vm.selected = category.name
                    return item.category === category.name
                })
            }
        },
        setRangeSlider() {
            if(this.minPrice > this.maxPrice) {
                let tmp = this.maxPrice
                this.maxPrice = this.minPrice
                this.minPrice = tmp
            }
            this.sortCategories()
        },
        sortBySearchValues(value) {
            this.sortedProducts = [...this.PRODUCTS]

            if(value) {
                this.sortedProducts = this.sortedProducts.filter(item => {
                    return item.name.toLowerCase().includes(value.toLowerCase())
                })
            } else {
                this.sortedProducts = this.PRODUCTS
            }
            
        },
        productPage(article) {
            this.$router.push({name: 'product', query: {'product': article}})
        }
    },
    watch: {
        SEARCH_VALUE() {
            this.sortBySearchValues(this.SEARCH_VALUE)
        }
    },
    mounted() {
        this.GET_PRODUCTS_FROM_API()
            .then((response) => {
                if(response.data) {
                    console.log('Data arrived!')
                    this.sortCategories()
                    this.sortBySearchValues(this.SEARCH_VALUE)
                }
            })
    }
}
</script>

<style lang="scss">
    .v-catalog {

        &__list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
        }
        &__cart {
            position: fixed;
            top: 20px;
            right: 50px;
            padding: $padding;
            border: 1px solid #aeaeae;
        }
    }

    .filters {
        display: flex;
        justify-content: space-between;
    }

    .range-value p {
        margin: 0;
        margin-bottom: 5px;
    }

    .range-slider {
        position: relative;
        width: 200px;
        margin: auto $margin*2;
        text-align: center;
    }

    .range-slider svg, .range-slider input[type=range] {
        position: absolute;
        left: 0;
        bottom: 0;
    }
        
    input[type=range]::-webkit-slider-thumb {
        z-index: 2;
        position: relative;
        top: -5px;
        margin-right: -5px;
    }

    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        background: #cccccc;
        border-radius: 6px;
    }
        
</style>