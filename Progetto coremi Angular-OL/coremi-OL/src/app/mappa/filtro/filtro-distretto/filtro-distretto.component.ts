import { Component, Input, OnInit } from '@angular/core';
import { MapComponent } from '../../map/map.component';
import Geometry from 'ol/geom/Geometry';
import Feature from 'ol/Feature';
import { FeatureHandlerService } from 'src/services/feature-handler.service';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { xhr } from 'ol/featureloader';

@Component({
  selector: 'app-filtro-distretto',
  templateUrl: './filtro-distretto.component.html',
  styleUrls: ['./filtro-distretto.component.css']
})
export class FiltroDistrettoComponent implements OnInit {
  

  constructor(private featureHandlerService: FeatureHandlerService) { }

  //Ciclo di vita
  ngOnInit(): void {
    console.log("Filtro - showFiltroComp: " + this.showFiltroComp)
    
    
  }

  ngOnChanges() {
    console.log("ngOnChange Filtro - showFiltroComp: " + this.showFiltroComp)
  }

  //Proprietà
  showFiltro: boolean = false; 
  valoreFiltro: number = 1;

  featureService = this.featureHandlerService

  //@Input() dati dal padre (mappa)
  @Input() showFiltroComp: boolean = false;


  

  //Metodi
  showDivFil(){
    this.showFiltro = !this.showFiltro;
  }

  range(): void{
    let x = <HTMLInputElement>document.getElementById("rangeInput");
    console.log(x!.value);
    this.valoreFiltro =+ x!.value;
  }


  filtraDistretti(){
    MapComponent.vectorLayer.getSource()!.getFeatures().map((feature: Feature<Geometry>) => this.featureService.elaborateFeatureForFilter(feature, this.valoreFiltro))   
  }
  
  eliminaFiltro(){
    MapComponent.vectorLayer.getSource()!.getFeatures().map((feature: Feature<Geometry>) => this.featureService.elaborateFeatureDeleteFilter(feature))   
    //this.valoreFiltro =+ 1;
    let x = <HTMLInputElement>document.getElementById("rangeInput");
    x!.value = '1'
    this.valoreFiltro =+ x!.value;
  }
}
