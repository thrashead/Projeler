import { Component } from "@angular/core";
import { Link } from '../../models/Link';

@Component({
    templateUrl: './pricing.html'
})

export class PricingComponent{
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
        linkContact.Title = "Paketler";
        linkContact.Link = "/Paketler";

        this.links.push(linkHome);
        this.links.push(linkContact);
    }
}