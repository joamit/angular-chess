import "hammerjs";
import {BrowserModule, DomSanitizer} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MdToolbarModule,
  MdButtonModule,
  MdIconModule,
  MdIconRegistry,
  MdSnackBarModule,
  MdMenuModule
} from "@angular/material";
import {ToolBarComponent} from "./tool-bar/tool-bar.component";
import {FooterComponent} from "./footer/footer.component";
import {GameBoardComponent} from "./game-board/game-board.component";
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
    MdIconModule,
    MdSnackBarModule,
    MdMenuModule
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
    //add all the chess pieces to icon registry
    mdIconRegistry.addSvgIcon('0', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/BlackBishop.svg'));
    mdIconRegistry.addSvgIcon('1', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/BlackKing.svg'));
    mdIconRegistry.addSvgIcon('2', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/BlackKnight.svg'));
    mdIconRegistry.addSvgIcon('3', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/BlackPawn.svg'));
    mdIconRegistry.addSvgIcon('4', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/BlackQueen.svg'));
    mdIconRegistry.addSvgIcon('5', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/BlackRook.svg'));
    mdIconRegistry.addSvgIcon('6', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/WhiteBishop.svg'));
    mdIconRegistry.addSvgIcon('7', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/WhiteKing.svg'));
    mdIconRegistry.addSvgIcon('8', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/WhiteKnight.svg'));
    mdIconRegistry.addSvgIcon('9', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/WhitePawn.svg'));
    mdIconRegistry.addSvgIcon('10', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/WhiteQueen.svg'));
    mdIconRegistry.addSvgIcon('11', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/WhiteRook.svg'));
  }
}
