import { Component } from "@angular/core";
import { ScriptsComponent } from '../../../shared/controls/scripts';

@Component({
    selector: 'hr-candidatelistsearch',
    templateUrl: './search.html'
})

export class CandidateListSearchComponent{ 
    ngOnInit() {
        ScriptsComponent.ToggleMenu(".sb-title");
    }
}