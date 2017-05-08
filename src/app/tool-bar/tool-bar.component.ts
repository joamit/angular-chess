import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-tool-bar',
    templateUrl: './tool-bar.component.html',
    styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

    private gameOver: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    isStarted() {
        return this.gameOver;
    }

    toggle() {
        this.gameOver = !this.gameOver;
    }

}
