import { Component } from "@angular/core";
import { Link } from '../../models/Link';

@Component({
    templateUrl: './about.html'
})

export class AboutComponent{ 
    links: Array<Link>; 

    ngOnInit() {
        this.FillLinks();
    }

    FillLinks() {
        this.links = new Array<Link>();

        let linkHome: Link = new Link();
        linkHome.Title = "Ana Sayfa";
        linkHome.Link = "/";

        let linkAbout: Link = new Link();
        linkAbout.Title = "Hakkımızda";
        linkAbout.Link = "/Hakkimizda";

        this.links.push(linkHome);
        this.links.push(linkAbout);
    }
}