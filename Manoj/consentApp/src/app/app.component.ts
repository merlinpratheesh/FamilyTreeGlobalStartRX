import { TemplatePortal, Portal} from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ElementRef
} from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'consentApp';
    tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
    @ViewChild('templatePortalContent1') templatePortalContent1: TemplateRef<unknown>;
      @ViewChild('templatePortalContent2') templatePortalContent2: TemplateRef<unknown>;
        @ViewChild('templatePortalContent3') templatePortalContent3: TemplateRef<unknown>;
          @ViewChild('templatePortalContent4') templatePortalContent4: TemplateRef<unknown>;


    selectedPortal1: Portal<any>;
    selectedPortal2: Portal<any>;
    selectedPortal3: Portal<any>;
    selectedPortal4: Portal<any>;


    constructor(private _viewContainerRef: ViewContainerRef) { }
    ngAfterViewInit() {
    this.selectedPortal1 = new TemplatePortal(
      this.templatePortalContent1,
      this._viewContainerRef
    );
    this.selectedPortal2 = new TemplatePortal(
      this.templatePortalContent2,
      this._viewContainerRef
    );
    this.selectedPortal3 = new TemplatePortal(
      this.templatePortalContent3,
      this._viewContainerRef
    );
    this.selectedPortal4 = new TemplatePortal(
      this.templatePortalContent4,
      this._viewContainerRef
    );
    }

}
