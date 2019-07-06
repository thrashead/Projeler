import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';
let SinaService = class SinaService {
    constructor(_http) {
        this._http = _http;
        this.mailGonderLink = "Ajax/MailGonder";
        this.resimlerLink = "Ajax/Resimler";
    }
    getResimler() {
        return this._http.get(this.resimlerLink);
    }
    getMailGonder(mail) {
        let params = new HttpParams().set("mail", JSON.stringify(mail));
        return this._http.get(this.mailGonderLink, { params: params });
    }
};
SinaService = tslib_1.__decorate([
    Injectable()
], SinaService);
export { SinaService };
//# sourceMappingURL=sina.service.js.map