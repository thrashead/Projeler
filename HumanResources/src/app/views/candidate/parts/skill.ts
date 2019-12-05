import { Component } from "@angular/core";
import { ScriptsComponent } from '../../shared/controls/scripts';

@Component({
    selector: 'hr-candidateskill',
    templateUrl: './skill.html'
})

export class CandidateSkillComponent{ 
    ngOnInit() {
        ScriptsComponent.CircleProgress('.second.circle');
    }
}