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
import { xhr } from 'ol/featureloader';
import { Distretto } from '../../classi/distretti/distretto';
import Geometry from 'ol/geom/Geometry';
import Feature from 'ol/Feature';
import { QualitaSpazio } from '../../classi/fenomeni-urbani/QualitaSpazio';

import { FirebaseService } from 'src/services/firebase/firebase.service';
import { FeatureHandlerService } from '../../../services/feature-handler.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{


  ngOnInit(): void {
    this.createMap();
    this.createLayerVectorImage();
  } 

  constructor(private featureHandlerService: FeatureHandlerService){
  
  }

  
//Proprietà
  jsonPath: string = 'assets/data/geoJSON2.geojson'
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

    let featureService = this.featureHandlerService

    let vectorLayer = new VectorLayer({
      source: new VectorSource({
        url: this.jsonPath,
        format: new GeoJSON()
      }),

      visible: true,

      style: function(){ //imposta un'icona diversa per ogni feature (punto sulla mappa)

        //vectorLayer.getSource()!.getFeatures().map(feature => FeatureHandler.elaborateFeature(feature))   
        vectorLayer.getSource()!.getFeatures().map(feature => featureService.elaborateFeature(feature))   
      }
        
    })

    MapComponent.mappa!.addLayer(vectorLayer);
   
  }//fine metodo

  


} 


