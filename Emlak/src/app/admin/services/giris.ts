﻿import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GirisService {

    constructor(private http: HttpClient) {
    }
}