import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    copyright: string;

    constructor() {
        this.copyright = 'Build with ♥ by the joamit ©2017';
    }

    ngOnInit() {
    }

}
