<template>
    <v-snackbar
            :value="notification.trigger"
            @input="$store.dispatch('CLEAR_NOTIFICATION')"
            :bottom="y === 'bottom'"
            :left="x === 'left'"
            :multi-line="mode === 'multi-line'"
            :right="x === 'right'"
            :timeout="timeout"
            :top="y === 'top'"
            :vertical="mode === 'vertical'"
            :color="notification.status"
    >
        {{ notification.message }}

        <v-btn flat @click="$store.dispatch('CLEAR_NOTIFICATION')">Close</v-btn>
    </v-snackbar>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {

        name: "NotificationsComponent",

        computed: {
            ...mapGetters({
                notification: 'getNotification'
            })
        },

        data() {
            return {
                y: 'top',
                x: null,
                mode: '',
                timeout: 10000,
            }
        }

    }
</script>

<style scoped>

</style>
