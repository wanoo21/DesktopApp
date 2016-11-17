<template>
    <div class="modal" v-if="showModal">
        <div class="modal-content">
            <h3 class="modal-content-title">
                <span>{{title}}</span>
                <span class="icons" v-if="closeIcon">
                    <i title="Close modal" @click="closeModal()" class="fa fa-times" aria-hidden="true"></i>
                </span>
            </h3>
            <div class="modal-content-body">{{{body}}}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import "../scss/variables";
    @import "bourbon";

    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        background-color: rgba($secondLight, .9);
        display: flex;
        justify-content: center;
        align-items: center;

        &.hidden {
            @include display(none)
        }

        &-content {
            width: 50%;
            height: 60%;
            background-color: $primaryLight;
            border-radius: 3px;
            box-shadow: 0 0 1px $secondDark;
            display: flex;
            flex-direction: column;
            & > * {
                padding: 15px 15px 10px;
            }

            &-title {
                margin: 0;
                border-bottom: 1px solid darken($primaryLight, 2);
                display: flex;
                justify-content: space-between;

                > span:first-child {
                    flex: 1;
                }
                > span.icons {
                    i {
                        cursor: pointer;
                        color: darken($primaryLight, 20);
                        @include transition(color .1s ease-in);
                        &:hover {
                            color: darken($primaryLight, 30);
                        }
                    }
                }
            }

            &-body {
                flex: 1;
                border-radius: 0 0 3px 3px;
                background-color: lighten($primaryLight, 2);
            }
        }
    }
</style>

<script>
    export default {
        data () {
            return {
                showModal: false,
                closeIcon: true,
                title: '',
                body: ''
            }
        },
        ready () {
            var vm = this
            this.$store.state.modal = {
                show (obj) {
                    if (!obj.title) return
                    obj.showModal = true
                    Object.assign(vm, obj)
                },
                hide () {
                    vm.closeModal()
                }
            }
        },
        methods: {
            closeModal () {
                Object.assign(this, {
                    showModal: false,
                    closeIcon: true,
                    title: '',
                    body: ''
                })
            }
        }
    }
</script>
