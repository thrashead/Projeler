import { Component } from "@angular/core";
import { ScriptsComponent } from '../../shared/controls/scripts';

@Component({
    templateUrl: './applies.html'
})

export class EmployerJobAppliesComponent{ 
    ngOnInit() {
        ScriptsComponent.Select2();
    }
}