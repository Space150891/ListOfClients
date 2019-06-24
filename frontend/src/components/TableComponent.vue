<template>
    <div>
        <v-toolbar color="white" flat>
            <v-toolbar-title>Clients</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="createClient()">New Client</v-btn>
        </v-toolbar>

        <v-data-table
                :headers="headers"
                :items="clients"
                :pagination.sync="pagination"
                class="elevation-1">

            <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.phone }}</td>
                <td>{{ props.item.providers | providersFilter}}</td>
                <td class="text-xs-center">
                    <v-btn @click="editClient(props.item)"> EDIT</v-btn>
                </td>
            </template>
        </v-data-table>


    </div>
</template>
<script>
    import {mapGetters} from "vuex";
    import {ClearClientModel} from '../Models/ClientModel';

    export default {

        name: 'TableComponent',

        data: () => ({
            isEdit: false,
            editableModel: Object.assign({}, ClearClientModel),
            pagination: {rowsPerPage: -1},
            headers: [
                {text: 'Name', align: 'center', sortable: false, value: 'name'},
                {text: 'Email', align: 'center', sortable: false, value: 'email',},
                {text: 'Phone', align: 'center', sortable: false, value: 'phone'},
                {text: 'Providers', align: 'center', sortable: false, value: 'providersShow'},
                {text: 'Edit', align: 'center', sortable: false, value: 'edit'},
            ],
        }),

        computed: {
            ...mapGetters({
                clients: 'getClients'
            }),
        },

        methods: {

            editClient(currentModel) {
                this.$store.dispatch('OPEN_MODAL', {isOpen: true, isEdit: true, model: currentModel});
            },

            createClient() {
                this.$store.dispatch('OPEN_MODAL', {isOpen: true, isEdit: false, model: ClearClientModel});
            }
        }
    }
</script>

<style lang="scss">

</style>
