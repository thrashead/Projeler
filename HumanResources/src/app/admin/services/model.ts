import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ModelService {
	constructor(private http: HttpClient) {
	}

	get(controller: string, action: string, id: string = null) {
		if (id == null)
			return this.http.get("Ajax/" + controller + "/" + action);
		else {
			let params = new HttpParams().set("id", id);
			return this.http.get("Ajax/" + controller + "/" + action, { params: params });
		}
	}

	post(controller: string, action: string, model: any) {
		return this.http.post("Ajax/" + controller + "/" + action, model);
	}
}
