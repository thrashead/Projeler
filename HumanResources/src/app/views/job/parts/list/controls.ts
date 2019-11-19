import { Component } from "@angular/core";
import { ScriptsComponent } from '../../../shared/controls/scripts';
import { Lib } from '../../../../lib/methods';

@Component({
    selector: 'hr-joblistcontrols',
    templateUrl: './controls.html'
})

export class JobListControlsComponent {
    ngOnInit() {
        ScriptsComponent.Select(".chosen");

        Lib.ComboChange("#slcSort");
        Lib.ComboChange("#slcPager");
    }
}