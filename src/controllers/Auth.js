import store from "@/store";

export function refresh(callback = function () { }) {
    console.log("REFRESH");
    store.commit('setLoading', true);
    setTimeout(function () {
        store.commit('setStart', true);
        store.commit('setLoading', false);
        store.commit('setAuth', true);
        callback(true, "refresh");
    }, 2000);
    callback(true, "refresh");
}