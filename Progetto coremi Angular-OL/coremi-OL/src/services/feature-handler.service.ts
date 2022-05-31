import { Injectable } from '@angular/core';
import { FirebaseService } from 'src/services/firebase/firebase.service';
import Feature from "ol/Feature";
import Geometry from "ol/geom/Geometry";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";


import { Distretto } from "../app/classi/distretti/distretto";
import { BuonaVegetazione } from "../app/classi/fenomeni-urbani/BuonaVegetazione";
import { CoesioneSpaziale } from "../app/classi/fenomeni-urbani/CoesioneSpaziale";
import { ColorMapping } from "./ColorMapping";
import { ElementiAmbientali } from "../app/classi/fenomeni-urbani/ElementiAmbientali";
import { AccessoWC } from "../app/classi/fenomeni-urbani/fenomeni-urbani-elementiAmbientali/AccessoWC";
import { CaffeRistoranti } from "../app/classi/fenomeni-urbani/fenomeni-urbani-elementiAmbientali/CaffeRistoranti";
import { Fontane } from "../app/classi/fenomeni-urbani/fenomeni-urbani-elementiAmbientali/Fontane";
import { Illuminazione } from "../app/classi/fenomeni-urbani/fenomeni-urbani-elementiAmbientali/Illuminazione";
import { OpereDarte } from "../app/classi/fenomeni-urbani/fenomeni-urbani-elementiAmbientali/OpereDarte";
import { Panchine } from "../app/classi/fenomeni-urbani/fenomeni-urbani-elementiAmbientali/Panchine";
import { Flessibilita } from "../app/classi/fenomeni-urbani/fenomeni-urbani-qualitaSpazio/Flessibilita";
import { IdentitaLuogo } from "../app/classi/fenomeni-urbani/fenomeni-urbani-qualitaSpazio/IdentitaLuogo";
import { Leggibilita } from "../app/classi/fenomeni-urbani/fenomeni-urbani-qualitaSpazio/Leggibilita";
import { PenetrabilitaFisica } from "../app/classi/fenomeni-urbani/fenomeni-urbani-qualitaSpazio/PenetrabilitaFisica";
import { Varieta } from "../app/classi/fenomeni-urbani/fenomeni-urbani-qualitaSpazio/Varieta";
import { OrientamentoCiclabile } from "../app/classi/fenomeni-urbani/OrientamentoCiclabile";
import { OrientamentoPedonale } from "../app/classi/fenomeni-urbani/OrientamentoPedonale";
import { QualitaSpazio } from "../app/classi/fenomeni-urbani/QualitaSpazio";
import { AreaUrbana } from 'src/app/classi/distretti/areaUrbana';

@Injectable({
  providedIn: 'root'
})
export class FeatureHandlerService {

  constructor(private fireService: FirebaseService) {
    //fireService.retrieveObservableItems()
   }

  //Proprietà
  //distrettoFromId = new Map([]);
  distrettoFromId = new Map<number, Distretto>();

  //Mappa un json in oggetti Distretto
  elaborateFeature(feature: Feature<Geometry>){

    //Prendo il nome del distretto dal geojson
    let nomeDistretto: string = feature.get('nomeDistretto');
    //console.log(nomeDistretto);

    let idDistretto:string | number | undefined = feature.getId();

    //Prendo il nome dell'area urbana dal geojson
    let nomeAreaUrbana: string = feature.get('AreaUrbana');
    

    //Prendo i fenomeni urbani dal geojson e creo gli oggetti
    //Coesione spaziale
    let coesSpazValue: number = feature.get('CoesioneSpaziale');
    let coesSpazObj = new CoesioneSpaziale(coesSpazValue);

    //Qualità dello spazio
    let qualSpazValue: number = feature.get('QualitaDelloSpazio')['Value'];

        let varietaValue: number = feature.get('QualitaDelloSpazio')['Varieta'];
        let varietaObj = new Varieta(varietaValue);

        let panFisValue: number = feature.get('QualitaDelloSpazio')['PenetrabilitaFisica'];
        let panFisObj = new PenetrabilitaFisica(panFisValue);

        let identLuogoValue: number = feature.get('QualitaDelloSpazio')['IdentitaLuogo'];
        let identLuogoObj = new IdentitaLuogo(identLuogoValue);

        let flessValue: number = feature.get('QualitaDelloSpazio')['Flessibilita'];
        let flessObj = new Flessibilita(flessValue);

        let leggValue: number = feature.get('QualitaDelloSpazio')['Leggibilita'];
        let leggObj = new Leggibilita(leggValue);

    let qualSpazObj = new QualitaSpazio(qualSpazValue, varietaObj, panFisObj, identLuogoObj, flessObj, leggObj);

    qualSpazObj.calculateUHIQualSpaz();
    
    
    //Orientamento pedonale
    let orPedValue: number = feature.get('OrientamentoPedonale');
    let orPedObj = new OrientamentoPedonale(orPedValue);

    //Elementi Ambientali
    let elAmbValue: number = feature.get('ElementiAmbientali')['Value'];

        let caffRestValue: number = feature.get('ElementiAmbientali')['CaffeRistoranti'];
        let caffRestObj = new CaffeRistoranti(caffRestValue);

        let panchineValue: number = feature.get('ElementiAmbientali')['Panchine'];
        let panchinetObj = new Panchine(panchineValue);

        let operDarteValue: number = feature.get('ElementiAmbientali')['OpereDarte'];
        let operDarteObj = new OpereDarte(operDarteValue);

        let fontaneValue: number = feature.get('ElementiAmbientali')['Fontane'];
        let fontaneObj = new Fontane(fontaneValue); 

        let illumValue: number = feature.get('ElementiAmbientali')['Illuminazione'];
        let illumObj = new Illuminazione(illumValue); 

        let accWCValue: number = feature.get('ElementiAmbientali')['AccessoWC'];
        let accWCObj = new AccessoWC(accWCValue);  

    let elAmbObj = new ElementiAmbientali(elAmbValue, caffRestObj, panchinetObj, operDarteObj, fontaneObj, illumObj, accWCObj);
    elAmbObj.calculateUHIElemAmb();
    

    //Buona Vegetazione
    let buonaVegValue: number = feature.get('BuonaVegetazione'); 
    let buonaVegObj = new BuonaVegetazione(buonaVegValue);
    buonaVegObj.calculateColor(buonaVegValue);
    

    //Orientamento Ciclabile
    let orCiclValue: number = feature.get('OrientamentoCiclabile');
    let orCiclObj = new OrientamentoCiclabile(orCiclValue);

    //Creo area urbana
    let areaUrbana = new AreaUrbana(nomeAreaUrbana, coesSpazObj, elAmbObj ,qualSpazObj, orPedObj, buonaVegObj, orCiclObj);
    
    //Creo distretto
    let distretto = new Distretto(idDistretto,nomeDistretto, areaUrbana);
    
    //Calcolo indice di felicità (UHI) del distretto
    let uhiDistretto = distretto.calculateUHI()
    

    //Calcolo colore del distretto in base all'indice di felicità
    distretto.calculateColor(uhiDistretto); 

    this.distrettoFromId.set(<number>feature.getId(), distretto);
    
    //Imposto l'icona per ogni feature in base al colore
    feature.setStyle(new Style({
        image: ColorMapping.setStyleIconFromColor(distretto.getColore())
    }))

    this.saveDistretto(distretto);

  }//fine metodo
  

  //Salva i valori dei fenomeni urbani in firebase
  saveDistretto(distretto: Distretto){
    this.fireService.saveDistrettoFirebase(distretto)
  }

  
  //Restituisce un Distretto tramite l'id
  getDistrettoById(id: number): Distretto{
    return this.distrettoFromId.get(id)!;
  };

  

}
