import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './mappa/map/map.component';
import { MarkerDistrettoComponent } from './mappa/marker/marker-distretto/marker-distretto.component';
import { MenuLeggendaComponent } from './mappa/leggenda/menu-leggenda/menu-leggenda.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MarkerDistrettoComponent,
    MenuLeggendaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
