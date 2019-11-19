import { Component } from "@angular/core";
import { Link } from '../../models/Link';

@Component({
    templateUrl: './index.html'
})

export class ContentIndexComponent{
    links: Array<Link>;
    title: string = 'İçerik Sayfası';
    message: string = 'Mesaj';

    ngOnInit() {
        this.FillLinks();
    }

    FillLinks() {
        this.links = new Array<Link>();

        let linkHome: Link = new Link();
        linkHome.Title = "Ana Sayfa";
        linkHome.Link = "/";

        this.links.push(linkHome);
    }
}