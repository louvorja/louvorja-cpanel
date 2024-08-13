import store from "@/store";
import router from '../router';

const Api = require("@/services/Api");

export function login(params, callback = function () { }) {
    store.commit('setLoading', true);
    Api.post('auth/login', params, function (resp, data) {
        store.commit('setLoading', false);
        store.commit('setAuth', resp);
        if (resp) {
            Api.set_token(data.token);
        }
        callback(resp, data);
    });
}

export function logout(callback = function () { }) {
    store.commit('setLoading', true);
    Api.post('auth/logout', null, function (resp, data) {
        //console.log('auth/logout', resp, data)
        store.commit('setLoading', false);
        store.commit('setAuth', false);
        Api.remove_token();
        router.push('/');
        callback(resp, data);
    });
}

export function refresh(callback = function () { }) {
    let token = Api.auth_token();
    if (token) {
        store.commit('setLoading', true);
        Api.post('auth/refresh-token', [], function (resp, data) {
            //console.log("refresh-token", resp, data)
            store.commit('setStart', true);
            store.commit('setLoading', false);
            store.commit('setAuth', resp);
            if (resp) {
                Api.set_token(data.token);
            } else {
                Api.remove_token();
            }
            callback(resp, data);
        });
    } else {
        store.commit('setStart', true);
        store.commit('setLoading', false);
        store.commit('setAuth', false);
        callback(false, null);
    }
}