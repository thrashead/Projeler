import { Component, Input } from "@angular/core";

@Component({
    selector: "emlak-contentheader",
    templateUrl: './header.html'
})

export class ContentHeaderComponent {
    @Input() headerText: string;

    constructor() {
    }

    ngOnInit() {
    }
}