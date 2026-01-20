import type { UserGateway } from "./user.gateway";
import type { Observable } from "rxjs";
import type { User } from "./user.model";

export class UserUseCase {
    constructor(private readonly _gateway: UserGateway) {}

    getUsers(): Observable<User> {
        return this._gateway.getUsers();
    }
}
