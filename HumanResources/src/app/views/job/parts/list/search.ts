import { Component } from "@angular/core";
import { ScriptsComponent } from '../../../shared/controls/scripts';

@Component({
    selector: 'hr-joblistsearch',
    templateUrl: './search.html'
})

export class JobListSearchComponent{ 
    ngOnInit() {
        ScriptsComponent.ToggleMenu(".sb-title");
    }
}