<template>
  <div class="v-main-wrapper">
      <vHeader />
      <router-view></router-view>
  </div>
</template>

<script>
import vHeader from '../components/layouts/v-header'

export default {
    name: 'v-main-wrapper',
    components: {
        vHeader
    },
    props: {},
    data() {
        return {
            
        }
    },
    computed: {},
    methods: {},
    watch: {},
    mounted() {},

}
</script>

<style>
    .v-main-wrapper {
        max-width: 900px;
        margin: 0 auto;
    }
</style>