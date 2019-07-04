import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var SharedService = /** @class */ (function () {
    function SharedService(http) {
        this.http = http;
        this.linkLogin = "Ajax/Shared/Login";
        this.linkLogout = "Ajax/Shared/Logout";
        this.linkLoginControl = "Ajax/Shared/LoginControl";
        this.linkCurrentUser = "Ajax/Shared/CurrentUser";
        this.linkHasRight = "Ajax/Shared/HasRight";
        this.linkShowType = "Ajax/Shared/ShowType";
    }
    SharedService.prototype.postLogin = function (user) {
        return this.http.post(this.linkLogin, user);
    };
    SharedService.prototype.getLogout = function () {
        return this.http.get(this.linkLogout);
    };
    SharedService.prototype.getLoginControl = function () {
        return this.http.get(this.linkLoginControl);
    };
    SharedService.prototype.getCurrentUser = function () {
        return this.http.get(this.linkCurrentUser);
    };
    SharedService.prototype.getHasRight = function (url, process) {
        var params = new HttpParams().set("url", url).set("process", process);
        return this.http.get(this.linkHasRight, { params: params });
    };
    SharedService.prototype.getShowType = function (url) {
        var params = new HttpParams().set("url", url);
        return this.http.get(this.linkShowType, { params: params });
    };
    SharedService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], SharedService);
    return SharedService;
}());
export { SharedService };
//# sourceMappingURL=shared.js.map