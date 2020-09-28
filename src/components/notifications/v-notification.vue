<template>
  <div class="v-notification">
    <transition-group
        name="v-transition-animate"
        class="messages-list"
    >
        <div
            class="v-notification__content"
            v-for="message in messages"
            :key="message.id"
            :class="message.icon"
        >
            <div class="content_text">
                <span>{{message.name}}</span>
                <i class="material-icons">{{message.icon}}</i>
            </div>
            <div class="content_buttons">
                <button v-if="rightButton.length">{{rightButton}}</button>
                <button v-if="leftButton.length">{{leftButton}}</button>
            </div>
        </div>
    </transition-group>

      
  </div>
</template>

<script>
export default {
    props: {
        messages: {
            type: Array,
            default: () => {
                return []
            }
        },
        rightButton: {
            type: String,
            default: ''
        },
        leftButton: {
            type: String,
            default: ''
        },
        timeout: {
            type: Number,
            default: '3000'
        }
    },
    methods: {
        hideNotification() {
            let vm = this
            if(this.messages.length) {
                setTimeout(() => {
                    vm.messages.splice(vm.messages.length - 1, 1)
                }, vm.timeout)
            }
        }
    },
    watch: {
        messages() {
            this.hideNotification()
        }
    },
    mounted() {
        this.hideNotification()
    }
}
</script>

<style lang="scss">
    .v-notification {
        position: fixed;
        top: 80px;
        right: 50px;
        z-index: 10;

        &__messages-list {
            display: flex;
            flex-direction: column-reverse;
        }

        &__content {
            display: flex;
            // flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 50px;
            margin-bottom: $margin*2;
            padding: $padding*2;
            border-radius: $radius;
            color: #ffffff;
            background-color: #26ae68;

            &.error {
                background-color: red;
            }
            &.warning {
                background-color: orange;
            }
            &.check_circle {
                background-color: #26ae68;
            }

        }

        .content {
            &_text {
                display: flex;
                align-items: center;
            }
        }

        .material-icons {
            margin-left: $margin;
        }
    }

    .v-transition-animate {
        &-enter {
            transform: translateX(120px);
            opacity: 0;
        }
        &-enter-active {
            transition: all .6s ease;
        }
        &-enter-to {
            opacity: 1;
        }

        &-leave {
            height: 50px;
            opacity: 1;
        }
        &-leave-active {
            transition: transform .6s ease, opacity .6s, height .6s .2s;
        }
        &-leave-to {
            transform: translateX(120px);
            height: 0;
            opacity: 0;
        }

        &-move {
            transition: transform .6s ease;
        }
    }
</style>