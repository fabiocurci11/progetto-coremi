import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './mappa/map/map.component';
import { MarkerDistrettoComponent } from './mappa/marker/marker-distretto/marker-distretto.component';
import { MenuLeggendaComponent } from './mappa/leggenda/menu-leggenda/menu-leggenda.component';
import { FiltroDistrettoComponent } from './mappa/filtro/filtro-distretto/filtro-distretto.component';
import { ModificaUhiComponent } from './mappa/marker/marker-distretto/modifica UHI/modifica-uhi/modifica-uhi.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MarkerDistrettoComponent,
    MenuLeggendaComponent,
    FiltroDistrettoComponent,
    ModificaUhiComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
