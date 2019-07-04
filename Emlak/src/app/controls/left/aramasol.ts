import { Component } from "@angular/core";
import { EmlakService } from "../../services/emlak.service";
import { SolService } from "../../services/sol.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
    selector: "emlak-aramasol",
    templateUrl: './aramasol.html',
    providers: [EmlakService, SolService]
})

export class AramaSolComponent {
    ilanlar: {};

    solAraForm: FormGroup;
    kelime: string;
    kod: string;
    araKelime: string;
    araTip: string;

    constructor(private _emlakService: EmlakService, private _solService: SolService, private _formBuilder: FormBuilder, private _router: Router) {
    }

    ngOnInit() {
        this.solAraForm = this._formBuilder.group({
            kelime: [null],
            kod: [null]
        });

        this.KodlaGetir();
    }

    onSubmit() {
        this.HataTemizle();

        this.kelime = this.solAraForm.get("kelime").value;
        this.kod = this.solAraForm.get("kod").value;

        if (this.kelime == null || this.kelime == "") {
            if (this.kod != null && this.kod != "") {
                if (this.kod.length == 20) {
                    this.araKelime = this.kod;
                    this.araTip = "kod";
                }
                else {
                    $("#solAraSonuc2").fadeIn("slow");
                    return false;
                }
            }
            else {
                $("#solAraSonuc1").fadeIn("slow");
                return false;
            }
        }
        else {
            if (this.kelime.length >= 3) {
                this.araKelime = this.kelime;
                this.araTip = "kelime";
            }
            else {
                $("#solAraSonuc1").fadeIn("slow");
                return false;
            }
        }

        if (this.araTip == "kelime") {
            this._router.navigate(['/Emlak/Listele', this.araKelime]);
        }

        if (this.araTip == "kod") {
            this._solService.getSolAraSonuc(this.araKelime, this.araTip)
                .subscribe((answer) => {
                    if (answer != "") {
                        this._router.navigate(['/Emlak/Detay', answer.RouteUrl]);
                    }
                    else {
                        if (this.araTip == "kod") {
                            $("#solAraSonuc3").fadeIn("slow");
                            return false;
                        }
                        else {
                            $("#solAraSonuc4").fadeIn("slow");
                            return false;
                        }
                    }
                },
                    resError => this.errorMsg = resError);
        }
    }

    closeArama() {
        $("#solarasonuclist").hide();
        $("#solarasonuckapat").hide();
    }

    HataTemizle() {
        $("#solAraSonuc1").hide();
        $("#solAraSonuc2").hide();
        $("#solAraSonuc3").hide();
        $("#solAraSonuc4").hide();
    }

    //KodlaGetir
    errorMsg: string;

    aramaText: string;
    kelimeAraText: string;
    kodAraText: string;
    btnAraText: string;
    linkAraText: string;
    kelimeGirText: string;
    kodGirText: string;
    kodYokText: string;
    ilanYokText: string;

    KodlaGetir() {
        this._emlakService.getKodlaGetir("srch")
            .subscribe(resData => this.aramaText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("sbyw")
            .subscribe(resData => this.kelimeAraText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("sbyc")
            .subscribe(resData => this.kodAraText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("serc")
            .subscribe(resData => this.btnAraText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("sdet")
            .subscribe(resData => this.linkAraText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("akgi")
            .subscribe(resData => this.kelimeGirText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("iktg")
            .subscribe(resData => { this.kodGirText = resData },
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("ikbu")
            .subscribe(resData => { this.kodYokText = resData },
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("akbu")
            .subscribe(resData => { this.ilanYokText = resData },
                resError => this.errorMsg = resError);
    }
}