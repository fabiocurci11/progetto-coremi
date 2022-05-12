import {Component, Input, OnInit, ɵɵclassMapInterpolate1 } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorImageLayer from 'ol/layer/VectorImage';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Vector from 'ol/source/Vector';
//import mygeojsonObject from 'src/data/geoJSON.geojson'
import VectorLayer from 'ol/layer/Vector';
import VectorImage from 'ol/layer/VectorImage';
import Style, { StyleFunction } from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Layer from 'ol/layer/Layer';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{

  ngOnInit(): void {
    console.log("ON INIT");
    this.createMap();
    this.createLayerVectorImage();
  
  }

  //Proprietà
  i:number = 0;
  public static mappa: Map | undefined;
  //Coordinate Salerno
  long: number = 14.7226162;
  lat: number = 40.6747225;
  //Dati da passare ai figli (filtro, modificaUHI)
  showChild: boolean = false;

  //Dati dal figlio (marker)

  markerNotifyMappa(showMenu: boolean): void{
    this.showChild = showMenu;
    console.log('Mappa - ShowChild: ' + this.showChild);
  }


   //Metodi

  //Crea Mappa
  createMap(): void{
    MapComponent.mappa = new Map({

      target: 'js-map',

      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      
      view: new View({
        //center: [0, 0],
        center: fromLonLat([this.long, this.lat],'EPSG:4326'),
        zoom: 6,
        minZoom: 4.8,
        projection: 'EPSG:4326',
      })
    });
  }
      
  
  
  //Crea Layer per dati geojson e immagini
  createLayerVectorImage(): void {

    //Icon Marker Style 
    const iconMarkerStyle = new Icon({
      src: 'assets/home2.png', 
      size: [100, 100],
      offset: [0,0],
      opacity: 1,
      scale: 0.5
    })

    const iconMarkerStyle2 = new Icon({
      src: 'assets/home.png', 
      size: [100, 100],
      offset: [0,0],
      opacity: 1,
      scale: 0.5
    })

    let vectorLayer = new VectorLayer({
      source: new VectorSource({
        url: 'assets/data/geoJSON2.geojson',
        format: new GeoJSON()
      }),

      visible: true,

      style: function(feature){ //imposta un'icona diversa per ogni feature (punto sulla mappa)

        
        vectorLayer.getSource()!.getFeatures().map(feature => {
          if(feature.getId() == 1){
            console.log('color property: ' + feature.get('color'));
            console.log('CP: ' + feature.get('CoesioneSpaziale')); 
            console.log('QDP: ' + feature.get('QualitaDelloSpazio')); 
            console.log('OP: ' + feature.get('OrientamentoPedonale')); 
            console.log('BV: ' + feature.get('BuonaVegetazione')); 
            console.log('OC: ' + feature.get('OrientamentoCiclabile')); 
            feature.setStyle(new Style({
              image: iconMarkerStyle2
            }))
          }

          if(feature.getId() == 2){
            feature.setStyle(new Style({
              image: iconMarkerStyle
            }))
          }

          if(feature.getId() == 3){
            feature.setStyle(new Style({
              image: iconMarkerStyle
            }))
          }

          if(feature.getId() == 4){
            feature.setStyle(new Style({
              image: iconMarkerStyle
            }))
          }

          if(feature.getId() == 5){
            feature.setStyle(new Style({
              image: iconMarkerStyle
            }))
          }
        })
        
      }
        
    })

    MapComponent.mappa!.addLayer(vectorLayer);
   
  }//fine metodo

  


} 



























