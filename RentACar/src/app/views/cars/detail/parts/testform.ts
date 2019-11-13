import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-cardetailtestform',
    templateUrl: './testform.html'
})

export class CarsDetailTestFormComponent {
    errorMsg: string;

    @Output() alert: string;
    @Input() carID;

    testForm: FormGroup;

    data: any;

    @Input() langs: any;

    constructor(private service: SiteService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.testForm = this.formBuilder.group({
            Name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
            Mail: new FormControl(null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
            Phone: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
            Message: new FormControl(null, [Validators.required, Validators.minLength(25), Validators.maxLength(255)]),
            CopyMail: new FormControl(null)
        });
    }

    onClick() {
        this.data = new Object();

        this.data.CarID = parseInt(this.carID);
        this.data.Name = this.testForm.get("Name").value;
        this.data.Mail = this.testForm.get("Mail").value;
        this.data.Phone = this.testForm.get("Phone").value;
        this.data.Message = this.testForm.get("Message").value;
        this.data.CopyMail = this.testForm.get("CopyMail").value;

        this.service.post("Site", "SendTestForm", this.data).subscribe((resData: any) => {
            $("#modalAlert").addClass("show");

            if (resData == true) {
                this.alert = this.langs.test.Alert;

                this.testForm.reset();
            }
            else {
                this.alert = this.langs.test.Error;
            }
        }, resError => this.errorMsg = resError);
    }
}
