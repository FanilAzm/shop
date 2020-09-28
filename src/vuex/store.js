import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        products: [],
        cart: [],
        isMobile: false,
        isDesktop: false,  //true
        searchValue: ''
    },
    mutations: {
        SET_PRODUCTS_TO_STATE: (state, products) => {
            state.products = products
        },
        SET_CART: (state, product) => {
            if(state.cart.length) {
                let isProductExist = false
                state.cart.map(item => {
                    if(item.article === product.article) {
                        isProductExist = true
                        item.quantity++
                    }
                })

                if(!isProductExist) {
                    state.cart.push(product)
                }
            } else {
                state.cart.push(product)
            }
        },
        REMOVE_FROM_CART: (state, index) => {
            state.cart.splice(index, 1)
        },
        DECREMENT: (state, index) => {
            if(state.cart[index].quantity > 1) {
                state.cart[index].quantity--
            }
        },
        INCREMENT: (state, index) => {
            state.cart[index].quantity++
        },
        SWITCH_DESKTOP: (state) => {
            state.isMobile = false
            state.isDesktop = true
        },
        SWITCH_MOBILE: (state) => {
            state.isMobile = true
            state.isDesktop = false
        },
        SET_SEARCH_VALUE: (state, value) => {
            state.searchValue = value
        }
    },
    actions: {
        GET_PRODUCTS_FROM_API({commit}) {
            return axios('http://localhost:3000/products', {
                method: 'GET'
            })
            .then(products => {
                commit('SET_PRODUCTS_TO_STATE', products.data)
                return products
            })
            .catch(err => {
                console.log(err)
                return err
            })
        },
        ADD_TO_CART({commit}, product) {
            commit('SET_CART', product)
        },
        DECREMENT_FROM_ITEM({commit}, index) {
            commit('DECREMENT', index)
        },
        INCREMENT_FROM_ITEM({commit}, index) {
            commit('INCREMENT', index)
        },
        DELETE_FROM_CART({commit}, index) {
            commit('REMOVE_FROM_CART', index)
        },
        SET_DESKTOP({commit}) {
            commit('SWITCH_DESKTOP')
        },
        SET_MOBILE({commit}) {
            commit('SWITCH_MOBILE')
        },
        GET_SEARCH_VALUE({commit}, value) {
            commit('SET_SEARCH_VALUE', value)
        }
    },
    getters: {
        PRODUCTS(state) {
            return state.products
        },
        CART(state) {
            return state.cart
        },
        IS_DESKTOP(state) {
            return state.isDesktop
        },
        IS_MOBILE(state) {
            return state.isMobile
        },
        SEARCH_VALUE(state) {
            return state.searchValue
        }
    }
})

export default store