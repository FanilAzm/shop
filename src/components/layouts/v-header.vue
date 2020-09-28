<template>
  <div class="v-header">
      <router-link :to="{name: 'main-page'}">
            <img src="../../assets/logo.png" alt="img">
      </router-link>
      <ul class="menu">
            <li>
                <router-link :to="{name: 'catalog'}" class="menu-link">Catalog</router-link>
            </li>
      </ul>
      <div class="search">
            <input type="text" class="search-field" v-model="searchValue">
            <i class="material-icons" @click="search(searchValue)">search</i>
            <i class="material-icons" @click="reset">cancel</i>
      </div>
      
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    data() {
        return {
            searchValue: ''
        }
    },
    computed: {
        ...mapGetters([
            'SEARCH_VALUE'
        ])
    },
    methods: {
        ...mapActions([
            'GET_SEARCH_VALUE'
        ]),
        search(value) {
            this.GET_SEARCH_VALUE(value)
            if(this.$route.path !== '/catalog') {
                this.$router.push('/catalog')
            }
        },
        reset() {
            this.searchValue = ''
            this.GET_SEARCH_VALUE()
            if(this.$route.path !== '/catalog') {
                this.$router.push('/catalog')
            }
        }
    }
}
</script>

<style lang="scss">
    .v-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        background-color: #26ae68;

        img {
            width: 50px;
        }
    }

    .menu {
        list-style-type: none;

        li {
            display: inline-block;
            margin-right: 20px;
        }

        &-link {
            text-decoration: none;
            color: #ffffff;
            font-weight: bold;
        }
    }

    .search {
        display: flex;
        align-items: center;

        i {
            background-color: transparent;
            border: none;
            cursor: pointer;
        }

        .search-field {
            padding: $padding;
            border: none;
        }
    }
</style>