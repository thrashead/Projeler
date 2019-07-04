import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IKullanicilar } from '../model/IKullanicilar';

@Injectable()
export class SharedService {
    private linkLogin: string = "Ajax/Shared/Login";
    private linkLogout: string = "Ajax/Shared/Logout";
    private linkLoginControl: string = "Ajax/Shared/LoginControl";
    private linkCurrentUser: string = "Ajax/Shared/CurrentUser";
    private linkHasRight: string = "Ajax/Shared/HasRight";
    private linkShowType: string = "Ajax/Shared/ShowType";

    constructor(private http: HttpClient) {
    }

    postLogin(user: any): Observable<boolean> {
        return this.http.post<boolean>(this.linkLogin, user);
    }

    getLogout(): Observable<boolean> {
        return this.http.get<boolean>(this.linkLogout);
    }

    getLoginControl(): Observable<boolean> {
        return this.http.get<boolean>(this.linkLoginControl);
    }
    
    getCurrentUser(): Observable<IKullanicilar> {
        return this.http.get<IKullanicilar>(this.linkCurrentUser);
    }

    getHasRight(url: any, process: string): any {
        let params = new HttpParams().set("url", url).set("process", process);
        return this.http.get<boolean>(this.linkHasRight, { params: params });
    }

    getShowType(url: string): any {
        let params = new HttpParams().set("url", url);
        return this.http.get<boolean>(this.linkShowType, { params: params });
    }
}