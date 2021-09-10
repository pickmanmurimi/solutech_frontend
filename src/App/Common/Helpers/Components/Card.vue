<template>
    <div class="card">
        <div class="card-content">
            <div v-if="showHeader" class="card-header" :class="headerBg">
                <h5 class="card-title text-uppercase text-muted mb-0" :class="titleColor">{{ title }} </h5>
                <span class="h2 font-weight-bold mb-0" :class="titleColor">{{ subtitle }}</span>
                <slot name="header"></slot>
            </div>
            <div class="card-body" :class="bodyBg"><slot name="body"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        /**
         * props
         */
        props: {
            title: {
                type: String,
                default: () => ''
            },
            headerBg: {
                type: String,
                default: () => ''
            },
            titleColor: {
                type: String,
                default: () => ''
            },
            subtitle: {
                type: String,
                default: () => ''
            },
            showBorder: {
                type: Boolean,
                default: () => false
            },
            showHeader: {
                type: Boolean,
                default: () => true
            },
            bodyBg: {
                type: String,
                default: () => ''
            }
        }
    }

</script>
