import Resource from "../Resource";

export default class Users extends Resource {
    comments() {
	const resource = new Comments(this.api, this.resource);

        resource.uri = `users/{resource}/comments`;

        return resource;
    }
}
