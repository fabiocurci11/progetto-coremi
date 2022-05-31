import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './mappa/map/map.component';
import { MarkerDistrettoComponent } from './mappa/marker/marker-distretto/marker-distretto.component';
import { MenuLeggendaComponent } from './mappa/leggenda/menu-leggenda/menu-leggenda.component';
import { FiltroDistrettoComponent } from './mappa/filtro/filtro-distretto/filtro-distretto.component';
import { ModificaUhiComponent } from './mappa/modifica UHI/modifica-uhi/modifica-uhi.component';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

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
    BrowserModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
