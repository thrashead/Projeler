import { Component } from "@angular/core";
import { Link } from '../../models/Link';

@Component({
    templateUrl: './contact.html'
})

export class ContactComponent{
    links: Array<Link>;

    ngOnInit() {
        this.FillLinks();
    }

    FillLinks() {
        this.links = new Array<Link>();

        let linkHome: Link = new Link();
        linkHome.Title = "Ana Sayfa";
        linkHome.Link = "/";

        let linkContact: Link = new Link();
        linkContact.Title = "İletişim";
        linkContact.Link = "/Iletisim";

        this.links.push(linkHome);
        this.links.push(linkContact);
    }
}