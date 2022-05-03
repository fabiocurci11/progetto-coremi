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
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

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

  //Proprietà

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
        projection: 'EPSG:4326',
      })
    });
  }
      
  
  //Crea Layer per dati geojson e immagini
  createLayerVectorImage(): void {

    //Icon Marker Style
    const iconMarkerStyle = new Icon({
      src: 'assets/icon.png',
      size: [100, 100],
      offset: [0,0],
      opacity: 1,
      scale: 0.35
    })

    let geoJSONVectorImage = new VectorImage({
      source: new Vector({
        url: 'assets/data/geoJSON.geojson',
        //features: new GeoJSON().readFeatures(mygeojsonObject),
        format: new GeoJSON(),
      }), 
      
      visible: true,
      style: new Style({
        image: iconMarkerStyle
      })
    }) 
    MapComponent.mappa!.addLayer(geoJSONVectorImage);
  }

}