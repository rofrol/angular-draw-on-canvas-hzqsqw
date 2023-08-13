import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas.component';
import { LineGraphComponent } from '../line-graph/line-graph.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, CanvasComponent, LineGraphComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
