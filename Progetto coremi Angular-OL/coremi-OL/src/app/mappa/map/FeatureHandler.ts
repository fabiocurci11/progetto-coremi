import Feature from "ol/Feature";
import Geometry from "ol/geom/Geometry";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import { AreaUrbana } from "../services/areaUrbana";
import { Distretto } from "../services/distretto";
import { BuonaVegetazione } from "../services/fenomeni-urbani/BuonaVegetazione";
import { CoesioneSpaziale } from "../services/fenomeni-urbani/CoesioneSpaziale";
import { OrientamentoPedonale } from "../services/fenomeni-urbani/OrientamentoPedonale";
import { QualitaSpazio } from "../services/fenomeni-urbani/QualitaSpazio";

export class FeatureHandler {

    //Icon Marker Style 
    static iconMarkerStyleRed = new Icon({
        src: 'assets/home2.png', 
        size: [100, 100],
        offset: [0,0],
        opacity: 1,
        scale: 0.5
      })

    //Icon Marker Style 
    static iconMarkerStyle2 = new Icon({
        src: 'assets/home2.png', 
        size: [100, 100],
        offset: [0,0],
        opacity: 1,
        scale: 0.5
      })
  
    static iconMarkerStyle3 = new Icon({
        src: 'assets/home.png', 
        size: [100, 100],
        offset: [0,0],
        opacity: 1,
        scale: 0.5
      })
    

      //Mappa un json in oggetti Distretto
    static elaborateFeature(feature: Feature<Geometry>){

        //Prendo il nome del distretto dal geojson
        let nomeDistretto: string = feature.get('nomeDistretto');
        console.log(nomeDistretto);

        //Prendo i fenomeni urbani dal geojson e creo gli oggetti
        let coesSpazValue: number = feature.get('CoesioneSpaziale');
        let coesSpazObj = new CoesioneSpaziale(coesSpazValue);

        let qualSpazValue: number = feature.get('QualitaDelloSpazio')['Value'];
        let qualSpazObj = new QualitaSpazio(qualSpazValue);

        let orPedValue: number = feature.get('OrientamentoPedonale');
        let orPedObj = new OrientamentoPedonale(orPedValue);

       // let valoreEA = feature.getProperties();
        //console.log('Fontane: '+feature.getProperties()['ElementiAmbientali']['Fontane']);
        //let ea = new QualitaSpazio(valoreQS);

        let buonaVegValue: number = feature.get('BuonaVegetazione'); 
        let buonaVegObj = new BuonaVegetazione(buonaVegValue);

        let orCiclValue: number = feature.get('OrientamentoCiclabile');
        let orCiclObj = new QualitaSpazio(orCiclValue);
 
        //Creo area urbana
        let areaUrbana = new AreaUrbana(nomeDistretto, coesSpazObj, qualSpazObj, orPedObj, buonaVegObj, orCiclObj);
        
        //Creo distretto
        let distretto = new Distretto(nomeDistretto, areaUrbana);

        //Calcolo indice di felicità (UHI) del distretto
        let uhiDistretto = distretto.calculateUHI()
        console.log('UHI: ' + uhiDistretto);


        feature.setStyle(new Style({
            image: this.iconMarkerStyle2
        }))
    
  }

}