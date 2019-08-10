import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ModelService {
    constructor(private http: HttpClient) {
    }

    get(controller: string, action: string, id: string = null, linkid: string = null, linkTypeID: string = null, typeID: string = null) {
        if (id != null) {
            let params = new HttpParams().set("id", id);
            return this.http.get("Ajax/" + controller + "/" + action, { params: params });
        }
        else if (linkid != null) {
            let params = new HttpParams().set("linkid", linkid);
            return this.http.get("Ajax/" + controller + "/" + action, { params: params });
        }
        else if (linkTypeID != null) {
            let params = new HttpParams().set("linkTypeID", linkTypeID);
            return this.http.get("Ajax/" + controller + "/" + action, { params: params });
        }
        else if (typeID != null) {
            let params = new HttpParams().set("typeID", typeID);
            return this.http.get("Ajax/" + controller + "/" + action, { params: params });
        }
        else
            return this.http.get("Ajax/" + controller + "/" + action);
    }

    post(controller: string, action: string, model: any) {
        return this.http.post("Ajax/" + controller + "/" + action, model);
    }
}