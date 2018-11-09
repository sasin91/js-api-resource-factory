import Users from "./api/resources/Users";
import axios from 'axios';
import swal from "sweetalert2";
import { invoke, camelCase } from 'lodash';
import { str_after, str_before } from "./helpers";
import CurrentUser from "./api/resources/CurrentUser";

export default class API {
    constructor () {
        this.client = axios.create({
            baseURL: '/api/',
            timeout: 500,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content
            }
        });

        this.client.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            switch (error.response.status) {
                case 400:
                case 422:
                    console.error(error.response);
                    swal('Validation failed.', error.response.data.message, 'error');
                    break;
            }

            return Promise.reject(error);
        });
    }

    async call(method, uri, params = {}) {
        return await this.client.call(
            method,
            uri,
            params
        );
    }

    resource(name, model) {
        if (name.includes('.')) {
            const resource = str_before(name, '.');
            const calls = str_after(name, '.');

            return invoke(this[camelCase(resource)](model), calls);
        }

        return this[camelCase(name)](model);
    }

    currentUser() {
        return new CurrentUser(this);
    }

    users(model) {
        return new Users(this, model);
    }
}
