<template>
  <div class="v-select">
      <p @click="optionVisible = !optionVisible">{{selected}}</p>
      <div
        class="options"
        v-if="optionVisible || isExpanded"
      >
          <p
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
          >
            {{option.name}}
          </p>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            default() {
                return []
            }
        },
        selected: {
            type: String,
            default: ''
        },
        isExpanded: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            optionVisible: false,
        }
    },
    methods: {
        selectOption(option) {
            this.$emit('select', option)
            this.optionVisible = false
        },
        hideSelect() {
            this.optionVisible = false
        }
    },
    mounted() {
        document.addEventListener('click', this.hideSelect.bind(this), true)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.hideSelect)
    }
}
</script>

<style lang="scss">
    .v-select {
        position: relative;
        width: 200px;
        margin-bottom: 10px;
        text-align: left;
        cursor: pointer;
    }
    .v-select p {
        margin: 0;
    }
    .options {
        background-color: #ffffff;
        border: 1px solid #aeaeae;
        position: absolute;
        top: 30px;
        right: 0;
        width: 100%;
        z-index: 2;
    }
    .options p:hover {
        background-color: #e7e7e7;
    }
</style>