import Feature from "ol/Feature";
import Geometry from "ol/geom/Geometry";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import { AreaUrbana } from "../../classi/areaUrbana"; 
import { Distretto } from "../../classi/distretto";
import { BuonaVegetazione } from "../../classi/fenomeni-urbani/BuonaVegetazione";
import { CoesioneSpaziale } from "../../classi/fenomeni-urbani/CoesioneSpaziale";
import { ColorMapping } from "../../classi/fenomeni-urbani/ColorMapping";
import { ElementiAmbientali } from "../../classi/fenomeni-urbani/ElementiAmbientali";
import { AccessoWC } from "../../classi/fenomeni-urbani/fenomeni-urbani-elementiAmbientali/AccessoWC";
import { CaffeRistoranti } from "../../classi/fenomeni-urbani/fenomeni-urbani-elementiAmbientali/CaffeRistoranti";
import { Fontane } from "../../classi/fenomeni-urbani/fenomeni-urbani-elementiAmbientali/Fontane";
import { Illuminazione } from "../../classi/fenomeni-urbani/fenomeni-urbani-elementiAmbientali/Illuminazione";
import { OpereDarte } from "../../classi/fenomeni-urbani/fenomeni-urbani-elementiAmbientali/OpereDarte";
import { Panchine } from "../../classi/fenomeni-urbani/fenomeni-urbani-elementiAmbientali/Panchine";
import { Flessibilita } from "../../classi/fenomeni-urbani/fenomeni-urbani-qualitaSpazio/Flessibilita";
import { IdentitaLuogo } from "../../classi/fenomeni-urbani/fenomeni-urbani-qualitaSpazio/IdentitaLuogo";
import { Leggibilita } from "../../classi/fenomeni-urbani/fenomeni-urbani-qualitaSpazio/Leggibilita";
import { PenetrabilitaFisica } from "../../classi/fenomeni-urbani/fenomeni-urbani-qualitaSpazio/PenetrabilitaFisica";
import { Varieta } from "../../classi/fenomeni-urbani/fenomeni-urbani-qualitaSpazio/Varieta";
import { OrientamentoCiclabile } from "../../classi/fenomeni-urbani/OrientamentoCiclabile";
import { OrientamentoPedonale } from "../../classi/fenomeni-urbani/OrientamentoPedonale";
import { QualitaSpazio } from "../../classi/fenomeni-urbani/QualitaSpazio";

export class FeatureHandler {

    //Mappa un json in oggetti Distretto
    static elaborateFeature(feature: Feature<Geometry>){

        //Prendo il nome del distretto dal geojson
        let nomeDistretto: string = feature.get('nomeDistretto');
        console.log(nomeDistretto);

        //Prendo il nome dell'area urbana dal geojson
        let nomeAreaUrbana: string = feature.get('AreaUrbana');
        console.log(nomeAreaUrbana);

        //Prendo i fenomeni urbani dal geojson e creo gli oggetti
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
        console.log('UHI qual spaz: ' + qualSpazObj.getValue());
        //


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
        console.log('UHI el amb: ' + elAmbObj.getValue());
        //

        let buonaVegValue: number = feature.get('BuonaVegetazione'); 
        let buonaVegObj = new BuonaVegetazione(buonaVegValue);
        buonaVegObj.calculateColor(buonaVegValue);
        console.log('color of buonVeg: ' + buonaVegObj.getColor())

        let orCiclValue: number = feature.get('OrientamentoCiclabile');
        let orCiclObj = new OrientamentoCiclabile(orCiclValue);
 
        //Creo area urbana
        let areaUrbana = new AreaUrbana(nomeAreaUrbana, coesSpazObj, qualSpazObj, orPedObj, buonaVegObj, orCiclObj);
        
        //Creo distretto
        let distretto = new Distretto(nomeDistretto, areaUrbana);

        //Calcolo indice di felicità (UHI) del distretto
        let uhiDistretto = distretto.calculateUHI()
        console.log('UHI: ' + uhiDistretto);

        //Calcolo colore del distretto in base all'indice di felicità
        distretto.calculateColor(uhiDistretto); 
        console.log('color property: ' + distretto.getColore()); 


        
        //Imposto l'icona per ogni feature in base al colore
        feature.setStyle(new Style({
            image: ColorMapping.setStyleIconFromColor(distretto.getColore())
        }))
    
  }

}