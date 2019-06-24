import Vue from 'vue';
import Vuex from 'vuex';
import {ClearClientModel} from './Models/ClientModel';

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        clients: [],
        providers: [],
        notification: {
            message: '',
            status: '',
            trigger: false
        },
        modalData: {
            isOpen: false,
            isEdit: false,
            isProvidersListShow: false,
            model: ClearClientModel,
        }
    },

    mutations: {

        SET_CLIENTS(state, payload) {
            state.clients = payload;
        },

        SET_PROVIDERS(state, payload) {
            state.providers = payload;
        },

        TRIGGER_MODAL(state, payload) {
            state.modalData = {
                isEdit: payload.isEdit,
                isOpen: payload.isOpen,
                isProvidersListShow: payload.isProvidersListShow,
                model: Object.assign({}, payload.model),
            };
        },

        TRIGGER_NOTIFICATION(state, payload) {
            state.notification = {
                message: payload.message,
                status: payload.status,
                trigger: payload.trigger
            };
        }

    },

    actions: {

        EMIT_NOTIFICATION({commit}, payload) {
            commit("TRIGGER_NOTIFICATION", payload);
        },

        CLEAR_NOTIFICATION({commit}) {
            commit("TRIGGER_NOTIFICATION", {
                message: '',
                status: undefined,
                trigger: false
            });
        },

        OPEN_MODAL({commit}, payload) {
            commit("TRIGGER_MODAL", payload);
        },

        CLOSE_MODAL({commit}) {
            commit("TRIGGER_MODAL", {
                isProvidersListShow: false,
                model: ClearClientModel,
                isEdit: false,
                isOpen: false
            });
        },

        GET_PROVIDERS: async ({commit}) => {
            const response = await Vue.http.get(`providers`);
            await commit("SET_PROVIDERS", response.data.data);
        },

        GET_CLIENTS: async ({commit}) => {
            const response = await Vue.http.get(`clients`);
            await commit("SET_CLIENTS", response.data.data);
        },

        CREATE_CLIENT: async ({dispatch}, payload) => {
            const response = await Vue.http.post(`clients`, payload);
            await dispatch("EMIT_NOTIFICATION", {
                message: response.data.message,
                status: 'info',
                trigger: true
            });
            await dispatch('CLOSE_MODAL');
            await dispatch("GET_CLIENTS");
        },

        UPDATE_CLIENT: async ({dispatch}, payload) => {
            const response = await Vue.http.put(`clients/${payload._id}`, payload);
            await dispatch("EMIT_NOTIFICATION", {
                message: response.data.message,
                status: 'info',
                trigger: true
            });
            await dispatch('CLOSE_MODAL');
            await dispatch("GET_CLIENTS");
        },

        DELETE_CLIENT: async ({dispatch}, payload) => {
            const response = await Vue.http.delete(`clients/${payload._id}`, payload);
            await dispatch("EMIT_NOTIFICATION", {
                message: response.data.message,
                status: 'info',
                trigger: true
            });
            await dispatch('CLOSE_MODAL');
            await dispatch("GET_CLIENTS");

        }

    },

    getters: {
        getClients: state => state.clients,
        getProviders: state => state.providers,
        getNotification: state => state.notification,
        getModalData: state => state.modalData,
    }
})
