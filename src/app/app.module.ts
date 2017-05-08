import 'hammerjs';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MdToolbarModule, MdButtonModule, MdIconModule, MdIconRegistry} from "@angular/material";
import {ToolBarComponent} from './tool-bar/tool-bar.component';
import {FooterComponent} from './footer/footer.component';
import {GameBoardComponent} from './game-board/game-board.component';
import {GameService} from "./game-service/game.service";

@NgModule({
    declarations: [
        AppComponent,
        ToolBarComponent,
        FooterComponent,
        GameBoardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MdToolbarModule,
        MdButtonModule,
        MdIconModule
    ],
    providers: [
        MdIconRegistry,
        GameService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(mdIconRegistry: MdIconRegistry, domSanitizer: DomSanitizer) {
        mdIconRegistry.addSvgIcon('play', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/play.svg'));
        mdIconRegistry.addSvgIcon('stop', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/stop.svg'));
    }
}