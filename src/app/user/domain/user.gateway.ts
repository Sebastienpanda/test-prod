import type { Observable } from "rxjs";
import type { User } from "./user.model";

export interface UserGateway {
    getUsers(): Observable<User>;
}
