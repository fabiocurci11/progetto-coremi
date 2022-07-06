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
import { MapComponent } from 'src/app/mappa/map/map.component';
import { FiltroDistrettoComponent } from 'src/app/mappa/filtro/filtro-distretto/filtro-distretto.component';
import { ConstantPool } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class FeatureHandlerService {


  constructor(private fireService: FirebaseService) {}

  //Proprietà
  //distrettoFromId = new Map([]);
  distrettoFromId = new Map<number, Distretto>();
  incrementalId: number = 1;
  valuesFromFirebase!: Map<string, number>;
  distretto!: Distretto; 
  
  

  //Mappa un json in oggetti Distretto
  elaborateFeature(feature: Feature<Geometry>){ 

    //Creo string id incrementale da passare al metodo retrieveObservableItems di firebasese.service
    let pathId: string = 'id'
    pathId = pathId + this.incrementalId
    this.incrementalId++;

    //Prendo il nome del distretto dal geojson
    let nomeDistretto: string = feature.get('nomeDistretto');
    //console.log(nomeDistretto);

    let idDistretto:string | number | undefined = feature.getId();

    //Prendo il nome dell'area urbana dal geojson
    let nomeAreaUrbana: string = feature.get('AreaUrbana');
    

    //Prendo i fenomeni urbani dal geojson e creo gli oggetti
   
    //Orientamento pedonale e peso
    //peso 1
    let peso1Value: number = feature.get('peso1');

    let orPedValue: number = feature.get('OrientamentoPedonale');
    let orPedObj = new OrientamentoPedonale(orPedValue, peso1Value);
    orPedObj.calculateColor(orPedValue);


    //Elementi Ambientali
    let elAmbValue: number = feature.get('ElementiAmbientali')['Value'];
    //alert('elamb val'+elAmbValue)

        //Peso2
        let peso2Value: number  = feature.get('ElementiAmbientali')['peso2'];

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

        
    let elAmbObj = new ElementiAmbientali(elAmbValue, peso2Value, caffRestObj, panchinetObj, operDarteObj, fontaneObj, illumObj, accWCObj);
    let uhiElAmb = elAmbObj.calculateUHIElemAmb();

    console.log('UHI EL AMB: '+uhiElAmb)

    elAmbObj.calculateColor(uhiElAmb); 

     //Coesione spaziale e peso
    //peso 3
    let peso3Value: number = feature.get('peso3');

    let coesSpazValue: number = feature.get('CoesioneSpaziale');
    let coesSpazObj = new CoesioneSpaziale(coesSpazValue, peso3Value);
    coesSpazObj.calculateColor(coesSpazValue);


    //Orientamento Ciclabile e peso
    //Peso 4
    let peso4Value: number = feature.get('peso4');

    let orCiclValue: number = feature.get('OrientamentoCiclabile');
    let orCiclObj = new OrientamentoCiclabile(orCiclValue, peso4Value);
    orCiclObj.calculateColor(orCiclValue);
    

    //Qualità dello spazio e peso
    //Peso 5
    let qualSpazValue: number = feature.get('QualitaDelloSpazio')['Value'];
    //alert('qualspaz val'+qualSpazValue)

        let peso5Value: number  = feature.get('QualitaDelloSpazio')['peso5'];

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

    let qualSpazObj = new QualitaSpazio(qualSpazValue, peso5Value ,varietaObj, panFisObj, identLuogoObj, flessObj, leggObj);
    let uhiQualSpaz = qualSpazObj.calculateUHIQualSpaz();

    console.log('UHI QUAL SPAZ: '+uhiQualSpaz)

    qualSpazObj.calculateColor(uhiQualSpaz); 
  

    //Buona Vegetazione e peso
    //Peso 6
    let peso6Value: number = feature.get('peso6');

    let buonaVegValue: number = feature.get('BuonaVegetazione'); 
    let buonaVegObj = new BuonaVegetazione(buonaVegValue, peso6Value);
    buonaVegObj.calculateColor(buonaVegValue);

    
    //Creo area urbana
    let areaUrbana = new AreaUrbana(nomeAreaUrbana, orPedObj, elAmbObj, coesSpazObj, orCiclObj, qualSpazObj, buonaVegObj);
    
    //Creo distretto
    
    let distretto = new Distretto(idDistretto,nomeDistretto, areaUrbana);
    
    //Calcolo indice di felicità (UHI) del distretto
    let uhiDistretto = distretto.calculateUHI()
    //console.log(uhiDistretto)
    

    //Calcolo colore del distretto in base all'indice di felicità
    distretto.calculateColor(uhiDistretto); 

    //Aggiungo ogni distretto al dizionario
    this.distrettoFromId.set(<number>feature.getId(), distretto);

  
    //Imposto l'icona per ogni feature in base al colore
    
    feature.setStyle(new Style({
        image: ColorMapping.setStyleIconFromColor(distretto.getColore())
    }))
    
    console.log('hello')
    //this.saveDistretto(distretto); 

    this.fireService.retrieveObservableItems(pathId, distretto, feature);

    
  }//fine metodo
  

  elaborateFeatureForFilter(feature: Feature<Geometry>, valueOfFilterUHI: number){ 
   // console.log("valore filtro: "+valueOfFilterUHI);

    //alert('id: '+feature.getId())
    this.distretto = this.getDistrettoById(<number>feature.getId())


    let peso1Value: number = feature.get('peso1');
    let peso2Value: number  = feature.get('QualitaDelloSpazio')['peso2'];
    let peso3Value: number = feature.get('peso3');
    let peso4Value: number  = feature.get('ElementiAmbientali')['peso4'];
    let peso5Value: number = feature.get('peso5');
    let peso6Value: number = feature.get('peso6');

    let uhiDistretto: number = this.distretto.calculateUHI();
    
    //Filtro i distretti in base all'UHI selezionata dall'utente
    //Setto un'icona vuota alla feature per i distretti che non devo mostrare
    feature.setStyle(new Style({
      image: ColorMapping.iconMarkerStyleVoid
    }))

    //Setto un'icona alla feature in base all'UHI selezionata dall'utente
    console.log('valueOfFilterUHI: '+valueOfFilterUHI + ' == ' +'uhiDistretto: '+uhiDistretto)

    //Mappo il valore del valore del filtro UHI con il colore corrispondente
    let colorOfFilter = ColorMapping.mapValueToColor(valueOfFilterUHI)
    console.log('color Filter: ' + colorOfFilter);

    let coloreDistretto = this.distretto.getColore()
    console.log('color Distretto: ' + coloreDistretto);

    //Se il colore del filtro e il colore del distretto sono uguali mostro a display i distretti con quel colore
    if(colorOfFilter == coloreDistretto){
      feature.setStyle(new Style({
          image: ColorMapping.setStyleIconFromColor(colorOfFilter)
      }))
      
    }

    
  }

  elaborateFeatureDeleteFilter(feature: Feature<Geometry>){ 
    //Prendo i distretti più aggiornati
    this.distretto = this.getDistrettoById(<number>feature.getId())

    feature.setStyle(new Style({
      image: ColorMapping.setStyleIconFromColor(this.distretto.getColore())
    }))
  }

  //Salva i valori dei fenomeni urbani dal geojson in firebase
  saveDistretto(distretto: Distretto){
    this.fireService.saveDistrettoFirebase(distretto)
  }

  
  //Restituisce un Distretto tramite l'id
  getDistrettoById(id: number): Distretto{
    return this.distrettoFromId.get(id)!;
  };


 



/* metodo funzionante pre firebase
  elaborateFeature(feature: Feature<Geometry>){

    let pathId: string = 'id'
    pathId = pathId + this.incrementalId
    console.log('CONTATORE: ' + this.incrementalId)
    console.log('PathId: ' + pathId)
    
    this.fireService.retrieveObservableItems(pathId)
    this.incrementalId++;

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
  */

}
