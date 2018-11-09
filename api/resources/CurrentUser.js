import Resource from "../Resource";

export default class CurrentUser extends Resource {
    constructor(api, model) {
        super(api, model);

        this.uri = 'current-user'
    }
}
