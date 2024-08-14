import store from "@/store";

const Api = require("@/services/Api");

export function list(params, callback = function () { }) {
    store.commit('setLoading', true);
    Api.get('admin/users', params, function (resp, data) {
        store.commit('setLoading', false);
        callback(resp, data);
    });
}