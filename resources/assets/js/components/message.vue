<template>
    <div>
        <li :class="className"><slot></slot></li>
        <small :class="badgeClass" class="badge float-right">{{ user }}</small>
    </div>
</template>

<script>

    export default {

        props: ['color', 'user'],

        computed: {
            className() {
                return 'list-group-item-' + this.color;
            },
            badgeClass() {
                return 'badge-' + this.color;
            }
        }

    }

</script>

<style>

</style>