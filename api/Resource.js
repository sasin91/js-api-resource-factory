import Form from 'form-backend-validation';

export default class Resource {
    constructor(api, model = null) {
        this.api = api;
        this.resource = (model && typeof model === 'object') ? model.id : model;
    }

    resourceUri() {
        if (this.uri) {
            if (this.resource && this.uri.includes('{resource}')) {
                return this.uri.replace('{resource}', this.resource);
            }

            return this.uri;
        }

        return this.constructor.name.toLowerCase();
    }

    url(to, model = null) {
        if (! model) {
            return `/${to}`;
        }

        if (typeof model === 'object') {
            model = model.id;
        }

        if (model) {
            return `/${to}/${model}`;
        }
    }

    call(method, model, params = null) {
        if (! params) {
            params = model;
            model = null;
        }

        /**
         * When given an instance of spatie/form-backend-validation,
         * we'll pass the API client to it and forward the call to it.
         */
        if (params instanceof Form) {
            params.withOptions({
                http: this.api.client
            });

            return params[method.toLowerCase()](
                this.url(this.resourceUri(), model)
            );
        }

        return this.api.call(
            method,
            this.url(this.resourceUri(), model),
            params
        );
    }

    index(params = {}) {
        return this.call('GET', null, params);
    }

    show(model, params = {}) {
        return this.call('GET', model, params);
    }

    update(model, params) {
        return this.call('PATCH', model, params);
    }

    store(model, params) {
        return this.call('POST', model, params);
    }

    destroy(model, params = {}) {
        return this.call('DELETE', model, params);
    }
}
