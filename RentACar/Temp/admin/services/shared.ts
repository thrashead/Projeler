import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SharedService {
    private linkLogin: string = "Ajax/Shared/Login";
    private linkLogout: string = "Ajax/Shared/Logout";
    private linkLoginControl: string = "Ajax/Shared/LoginControl";
    private linkCurrentUser: string = "Ajax/Shared/CurrentUser";
    private linkCurrentUserRights: string = "Ajax/Shared/CurrentUserRights";
    private linkHasRight: string = "Ajax/Shared/HasRight";
    private linkShowTypes: string = "Ajax/Shared/ShowTypes";

    constructor(private http: HttpClient) {
    }

    postLogin(user: any) {
        return this.http.post(this.linkLogin, user);
    }

    getLogout() {
        return this.http.get(this.linkLogout);
    }

    getLoginControl() {
        return this.http.get(this.linkLoginControl);
    }

    getCurrentUser() {
        return this.http.get(this.linkCurrentUser);
    }

    getCurrentUserRights(url: string = null, process: string = null) {
        let params = new HttpParams().set("url", url).set("process", process);
        return this.http.get(this.linkCurrentUserRights, { params: params });
    }

    getHasRight(url: string = null, process: string = null) {
        let params = new HttpParams().set("url", url).set("process", process);
        return this.http.get(this.linkHasRight, { params: params });
    }

    getShowTypes(url: string = null) {
        let params = new HttpParams().set("url", url);
        return this.http.get(this.linkShowTypes, { params: params });
    }
}