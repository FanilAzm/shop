<template>
    <div class="popup-wrapper" ref="popup-wrapper">
        <div class="v-popup">
            <div class="v-popup__header">
                <span>{{popupTitle}}</span>
                <span>
                    <i class="material-icons" @click="closePopup">close</i>
                </span>
            </div>
            <div class="v-popup__body">
                <slot></slot>
            </div>
            <div class="v-popup__footer">
                <button class="close_btn" @click="closePopup">Close</button>
                <button class="submit_btn" @click="rightBtnAction">{{popupRightBtn}}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        popupTitle: {
            type: String,
            default: 'Popup name'
        },
        popupRightBtn: {
            type: String,
            default: 'Ok'
        } 
    },
    methods: {
        closePopup() {
            this.$emit('closePopup')
        },
        rightBtnAction() {
            this.$emit('rightBtnAction')
        }
    },
    mounted() {
        let vm = this
        document.addEventListener('click', e => {
            if(e.target === vm.$refs['popup-wrapper']) {
                vm.closePopup()
            }
        })
    }
}
</script>

<style lang="scss">
    .popup-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(64, 64, 64, .4);
    }
    .v-popup {
        padding: $padding*2;
        position: fixed;
        top: 50px;
        width: 400px;
        background-color: white;
        box-shadow: 0 0 8px 0 #e0e0e0;
        z-index: 10;

        &__header, &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &__body {
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

        .close_btn {
            padding: $padding;
            color: white;
            background-color: rgb(247, 38, 38);
            border: none;
        }
        .submit_btn {
            padding: $padding;
            color: white;
            background-color: #26ae68;
            border: none;
        }
    }
</style>