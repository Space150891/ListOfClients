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
                                                  placeholder="enter provider name or edit exist"
                                                  v-model="providerNameInput" required>
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs5>
                                    <v-btn style="float: right"  @click="saveProvider" :disabled="!providerNameInput">
                                        <span>{{this.editProviderId ? BUTTON_EDIT_NAME : BUTTON_CREATE_NAME}}</span>
                                    </v-btn>
                                </v-flex>

                                <v-flex xs7>
                                    <div style="border: 1px solid rgba(0,0,0,.42); border-radius: 15px">
                                        <v-container fluid v-if="providersList.length">
                                            <v-layout  v-for="provider in providersList" :key="'providerList' + provider._id">

                                                <v-checkbox v-model="provider.isChecked"
                                                            :label="provider.name">
                                                </v-checkbox>

                                                <i class="material-icons custom-button"
                                                   @click="removeProvider(provider)">
                                                   delete
                                                </i>

                                                <i class="material-icons custom-button"
                                                   :class=" editProviderId === provider._id ? 'color' : ''"
                                                   @click="editProvider(provider)">
                                                   edit
                                                </i>

                                            </v-layout>
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
            editProviderId: '',
            providerNameInput: '',
            BUTTON_EDIT_NAME: 'edit provider',
            BUTTON_CREATE_NAME: 'create provider'
        }),

        computed: {
            ...mapGetters({
                providers: 'getProviders',
                modalData: 'getModalData'
            }),

            providersList(){
                return this.providers.map(providerItem => {
                    return {
                        ...providerItem,
                        isChecked: this.modalData.model.providers.filter(item => item._id === providerItem._id).length > 0
                    }
                });
            }

        },

        methods: {

            save() {
                this.modalData.model.providers = this.providersList.filter(item => item.isChecked).map(item => ({_id: item._id}));
                this.modalData.isEdit ? this.update() : this.create();
            },
            update() {
                this.$store.dispatch("UPDATE_CLIENT", this.modalData.model);
                this.clearComponentData();
            },
            create() {
                if (!this.modalData.isEdit) delete this.modalData.model._id;
                this.$store.dispatch("CREATE_CLIENT", this.modalData.model);
                this.clearComponentData();
            },
            remove() {
                this.$store.dispatch('DELETE_CLIENT', this.modalData.model);
                this.clearComponentData();
            },

            saveProvider(){
                this.editProviderId
                    ?
                    this.$store.dispatch('UPDATE_PROVIDER', {name: this.providerNameInput, _id:this.editProviderId})
                    :
                    this.$store.dispatch('CREATE_PROVIDER', {name: this.providerNameInput});

                this.clearComponentData();
            },
            removeProvider(currentProvider){
                this.$store.dispatch('DELETE_PROVIDER', currentProvider);
                this.clearComponentData();
            },
            editProvider(currentProvider){

                if (this.editProviderId === currentProvider._id ) {
                    this.editProviderId = '';
                    this.providerNameInput = '';
                } else {
                    this.editProviderId = currentProvider._id;
                    this.providerNameInput = currentProvider.name;
                }
            },

            clearComponentData(){
                this.providerNameInput = '';
                this.editProviderId = '';
            }

        }
    }
</script>

<style scoped lang="scss">
    .v-input--selection-controls {
        margin: 0;
    }
    .custom-button {
        padding-left: 10px;
        padding-right: 20px;
        height: 30px;
        cursor: pointer;

        &:hover {
            color: #4097f3;
        }
    }

    .color {
        color: red;
    }
</style>
