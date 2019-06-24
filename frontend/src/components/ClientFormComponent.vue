<template>
    <div>
        <v-layout row justify-end>
            <v-dialog v-model="modalData.isOpen" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline"> {{ modalData.isEdit ? 'Edit Client' : 'Create New Client'}}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Name" v-model="modalData.model.name"></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field label="Email" v-model="modalData.model.email"></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field label="Phone" v-model="modalData.model.phone"></v-text-field>
                                </v-flex>

                                <v-flex xs7>
                                    <v-text-field label="Providers"
                                                  :value="currentProvidersList | providersFilter"
                                                  required disabled></v-text-field>
                                </v-flex>

                                <v-flex xs5>
                                    <v-btn style="float: right"
                                           @click="modalData.isProvidersListShow = !modalData.isProvidersListShow">
                                        <span> {{  modalData.isEdit ? 'Add or Remove' : 'Add' }}</span>
                                    </v-btn>
                                </v-flex>

                                <v-flex xs7>
                                    <div v-if="modalData.isProvidersListShow"
                                         style="border: 1px solid rgba(0,0,0,.42); border-radius: 15px">
                                        <v-container fluid>
                                            <v-checkbox
                                                    v-for="elem in providersList"
                                                    v-model="elem.isChecked"
                                                    :key="elem.id"
                                                    :label="elem.name">
                                            </v-checkbox>
                                        </v-container>
                                    </div>
                                </v-flex>

                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn v-if="modalData.isEdit" color="error" @click="remove">Delete</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="blue" @click="$store.dispatch('CLOSE_MODAL')">Close</v-btn>
                        <v-btn color="blue" @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {

        name: "ClientFormComponent",

        data: () => ({
            providersList: [],
        }),

        computed: {
            ...mapGetters({
                providers: 'getProviders',
                modalData: 'getModalData'
            }),

            currentProvidersList() {
                return this.providersList.filter(item => item.isChecked);
            }
        },

        watch: {
            modalData(modalData) {
                this.createProvidersList(modalData);
            }
        },

        methods: {
            createProvidersList(modalData) {
                this.providersList = this.providers.map(providerItem => {
                    return {
                        ...providerItem,
                        isChecked: modalData.model.providers.filter(item => item._id === providerItem._id).length > 0
                    }
                });
            },

            save() {
                this.modalData.model.providers = this.providersList.filter(item => item.isChecked).map(item => ({_id: item._id}));
                this.modalData.isEdit ? this.update() : this.create();
            },

            update() {
                this.$store.dispatch("UPDATE_CLIENT", this.modalData.model);
            },

            create() {
                if (!this.modalData.isEdit) delete this.modalData.model._id;
                this.$store.dispatch("CREATE_CLIENT", this.modalData.model);
            },

            remove() {
                this.$store.dispatch('DELETE_CLIENT', this.modalData.model);
            }

        }
    }
</script>

<style scoped>
    .v-input--selection-controls {
        margin: 0;
    }
</style>
