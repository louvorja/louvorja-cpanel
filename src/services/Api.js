//import store from '@/store'

const Storage = require("@/helpers/Storage");

export function get(route, options = null, callback = function () { }) {
    this.call("get", route, options, null, (resp, data) => {
        callback(resp, data);
    });
}

export function post(route, body = null, callback = function () { }) {
    this.call("post", route, null, body, (resp, data) => {
        callback(resp, data);
    });
}

export function patch(route, body = null, callback = function () { }) {
    this.call("put", route, null, body, (resp, data) => {
        callback(resp, data);
    });
}

export function remove(route, callback = function () { }) {
    this.call("delete", route, null, null, (resp, data) => {
        callback(resp, data);
    });
}

export async function call(method, route, options = null, body = null, callback = function () { }) {
    let params = "";
    if (options) {
        params = `?${this.data_to_url(options)}`;
    }

    let url = this.url(route + params);

    let headers = this.headers();

    if (body) {
        body = JSON.stringify(body || {});
    }

    let error = "";
    let response = await fetch(url,
        {
            method,
            headers,
            body
        }
    ).catch(err => {
        error = err;
        callback(false, { error: `Erro ao conectar:  ${error}` });
        return false;
    });


    if (response.ok) {

        let data = await response.json();
        if (data.error != undefined && data.error != '') {
            callback(false, data);
            return false;
        }

        callback(true, data);
        return true;
    } else {
        if (error != "") {
            callback(false, { error: `Erro ao conectar:  ${error}` });
        } else {
            let data = await response.json();
            callback(false, data);
        }
        return false;
    }
}
export function base_url() {
    if (window.location.hostname == "localhost") {
        return "http://localhost:8000";
    } else {
        return "https://api.louvorja.com.br";
    }
}
export function url(route) {
    let url = `${this.base_url()}/${route}`;
    return url;
}
export function headers() {
    return {
        'Content-Type': 'application/json',
        'Api-Token': this.api_token(),
        'Authorization': `Bearer ${this.auth_token()}`
    }
}
export function data_to_url(data) {
    return new URLSearchParams(data).toString();
}
export function api_token() {
    return '02@v2nFB2Dc';
}
export function auth_token() {
    return Storage.get('token', '');
}
export function set_token(token) {
    return Storage.set('token', token);
}
export function remove_token() {
    return Storage.remove('token');
}