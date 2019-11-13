import { Component, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteService } from '../../../services/site';
@Component({
    selector: 'rac-contactform',
    templateUrl: './form.html'
})

export class ContactFormComponent {
    errorMsg: string;

    @Output() alert: string;

    contactForm: FormGroup;

    data: any;

    @Input() langs: any;

    constructor(private service: SiteService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.contactForm = this.formBuilder.group({
            Sender: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            Mail: new FormControl(null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
            Phone: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
            Message: new FormControl(null, [Validators.required, Validators.minLength(25), Validators.maxLength(500)])
        });
    }

    onClick() {
        this.data = new Object();

        this.data.Sender = this.contactForm.get("Sender").value;
        this.data.Mail = this.contactForm.get("Mail").value;
        this.data.Phone = this.contactForm.get("Phone").value;
        this.data.Message = this.contactForm.get("Message").value;

        this.service.post("Site", "SendContactForm", this.data).subscribe((resData: any) => {
            $("#modalAlert").addClass("show");

            if (resData == true) {
                this.alert = this.langs.contact.Alert;

                this.contactForm.reset();
            }
            else {
                this.alert = this.langs.contact.Error;
            }
        }, resError => this.errorMsg = resError);
    }
}
