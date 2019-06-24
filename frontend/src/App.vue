<template>
    <div id="app">
        <v-app>
            <NotificationsComponent></NotificationsComponent>
            <TableComponent></TableComponent>
            <ClientFormComponent></ClientFormComponent>
        </v-app>
    </div>
</template>

<script>
    import NotificationsComponent from "./components/NotificationsComponent";
    import TableComponent from './components/TableComponent';
    import ClientFormComponent from "./components/ClientFormComponent";

    export default {

        name: 'app',

        components: {
            NotificationsComponent,
            TableComponent,
            ClientFormComponent
        },

        created() {
            this.$store.dispatch('GET_CLIENTS');
            this.$store.dispatch("GET_PROVIDERS");
        }
    }
</script>

<style lang="scss">
    body {
        background: cornflowerblue;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .application--wrap {
        min-height: auto !important;
    }
</style>
