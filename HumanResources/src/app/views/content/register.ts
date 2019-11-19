import { Component } from "@angular/core";
import { Link } from '../../models/Link';
import { ScriptsComponent } from '../shared/controls/scripts';
import { Lib } from '../../lib/methods';

@Component({
    templateUrl: './register.html'
})

export class RegisterComponent {
    links: Array<Link>;

    ngOnInit() {
        this.FillLinks();

        ScriptsComponent.Select(".chosen");
        Lib.ComboChange("#slcSpecial");
    }

    FillLinks() {
        this.links = new Array<Link>();

        let linkHome: Link = new Link();
        linkHome.Title = "Ana Sayfa";
        linkHome.Link = "/";

        let linkRegister: Link = new Link();
        linkRegister.Title = "Kayıt Ol";
        linkRegister.Link = "/Kayit";

        this.links.push(linkHome);
        this.links.push(linkRegister);
    }
}