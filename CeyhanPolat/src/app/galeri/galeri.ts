import { Component } from "@angular/core";
import { CPService } from "../cp.service";

@Component({
    templateUrl: './galeri.html',
    providers: [CPService]
})

export class GaleriComponent {
    galeri: any;
    errorMsg: string;

    constructor(private _cpService: CPService) {
    }

    ngOnInit() {
        this._cpService.getGaleri()
            .subscribe((resGaleriData) => {
                this.galeri = resGaleriData;

                setTimeout(function () {
                    $('#cpGallery').tdGallery({
                        imagefolder: "Gallery",
                        thumbfolder: "Thumb"
                    });
                }, 500);
            },
                resError => this.errorMsg = resError);
    }
}