import { Component } from "@angular/core";
import { ScriptsComponent } from '../../../shared/controls/scripts';

@Component({
    selector: 'hr-employerlistsearch',
    templateUrl: './search.html'
})

export class EmployerListSearchComponent{ 
    ngOnInit() {
        ScriptsComponent.ToggleMenu(".sb-title");
    }
}