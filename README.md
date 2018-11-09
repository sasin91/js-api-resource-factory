# Experimental pattern for stuffing all urls in one place.

## Add this in your Vue app.js 
```
/**
 * Bind $api to an instance of API
 * This allows us to keep all API calls in a central place.
 *
 * @type {API}
 */
Vue.prototype.$api = function (resource = null, model = null) {
    const api = new API;

    if (resource) {
        return api.resource(resource, model);
    }

    return api;
}
```

## To access nested resources, use dot syntax and pass the model
```
this.$api('users.comments', this.user).store(this.form);
```
