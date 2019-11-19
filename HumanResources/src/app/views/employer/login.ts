import { Component } from "@angular/core";
import { Link } from '../../models/Link';

@Component({
    templateUrl: './login.html'
})

export class EmployerLoginComponent {
    links: Array<Link>;

    ngOnInit() {
        this.FillLinks();
    }

    FillLinks() {
        this.links = new Array<Link>();

        let linkHome: Link = new Link();
        linkHome.Title = "Ana Sayfa";
        linkHome.Link = "/";

        let linkLogin: Link = new Link();
        linkLogin.Title = "Giriş";
        linkLogin.Link = "/IsVeren/Giris";

        this.links.push(linkHome);
        this.links.push(linkLogin);
    }
}