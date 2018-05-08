<template>
    <div>
        <li :class="className"><slot></slot> <span id="time">{{ time }}</span></li>
        <small :class="badgeClass" class="badge float-right">{{ user }}</small>
    </div>
</template>

<script>

    export default {

        props: ['color', 'user', 'time'],

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

    #time {
        font-size: 10px;
        margin-left: 20px;
        display: block;
        color: black;
    }

</style>