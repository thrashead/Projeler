import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SharedService {
    private linkLogin: string = "Ajax/Shared/Login";
    private linkLogout: string = "Ajax/Shared/Logout";
    private linkLoginControl: string = "Ajax/Shared/LoginControl";
    private linkCurrentUser: string = "Ajax/Shared/CurrentUser";
    private linkHasRight: string = "Ajax/Shared/HasRight";
    private linkShowType: string = "Ajax/Shared/ShowType";

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

    getHasRight(url: any, process: string) {
        let params = new HttpParams().set("url", url).set("process", process);
        return this.http.get(this.linkHasRight, { params: params });
    }

    getShowType(url: string) {
        let params = new HttpParams().set("url", url);
        return this.http.get(this.linkShowType, { params: params });
    }
}