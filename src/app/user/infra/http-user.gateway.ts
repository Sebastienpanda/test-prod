import type { UserGateway } from "../domain/user.gateway";
import type { Observable } from "rxjs";
import type { User } from "../domain/user.model";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";

export class HttpUserGateway implements UserGateway {
    private readonly http = inject(HttpClient);
    getUsers(): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/user/me`);
    }
}
