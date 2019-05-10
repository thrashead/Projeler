import { Component, ViewEncapsulation } from "@angular/core";
import { IKService } from "../../services/ik.service";

@Component({
    templateUrl: 'app/aday/islem/sifre.html',
    styleUrls: [
        'Content/css/sayfalar/Kayit.css'
    ],
    encapsulation: ViewEncapsulation.None,
    providers: [IKService]
})

export class AdayIslemSifreComponent{ 
    constructor(private ikService: IKService) {
    }

    ngOnInit() {

    }

    onClick(event: any) {
        var target = event.target || event.srcElement || event.currentTarget;
    }
}