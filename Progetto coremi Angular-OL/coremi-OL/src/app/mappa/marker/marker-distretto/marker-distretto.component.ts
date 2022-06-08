import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Map, Overlay } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { Distretto } from 'src/app/classi/distretti/distretto';
import { ColorMapping } from 'src/services/ColorMapping';
import { FirebaseService } from 'src/services/firebase/firebase.service';
import { FeatureHandlerService } from '../../../../services/feature-handler.service';
import { MapComponent } from '../../map/map.component';

@Component({
  selector: 'app-marker-distretto',
  templateUrl: './marker-distretto.component.html',
  styleUrls: ['./marker-distretto.component.css']
})
export class MarkerDistrettoComponent implements OnInit {

  constructor(private featureHandlerService: FeatureHandlerService){}

  ngOnInit(): void {
    this.clickOnMarker();
  }

  ngOnChanges() {
    //alert('OnChanges: '+this.updateBackColorFenUrb)
    if(this.updateBackColorFenUrb){
     // alert('update back color')
      this.addBackColorForImg(this.distrettoClicked)
      //alert(this.distrettoClicked.urbanArea.orientamentoPedonale.getColor())
    }
    //alert(FirebaseService.varNotify)
    if(FirebaseService.varNotify){
      this.addBackColorForImg(this.distrettoClicked)
    }
  }

  //Proprietà
  showDiv: boolean = true;
  showMenu: boolean = false;
  figlioString: string = 'string figlio';
  distrettoClicked!: Distretto
  
  //@Output() dati dal figlio (marker) al padre (mappa)
 
  @Output() markerChildNotify: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Output() markerChildIdDistretto: EventEmitter<number> = new EventEmitter<number>()

  @Input() updateBackColorFenUrb: boolean = false;

  //Proprietà distretti (img fen urb)
  pathImg = 'assets/fen_urb_icon/';

  //var Img impostano l'immagine, var BackColor impostano il colore dello sfondo dell'immagine
  orPedImg = '';
  orPedBackColor: string = '';

  elAmbImg = '';
  elAmbBackColor: string = '';

    caffeRistoImg = '';
    caffeRistoBackColor: string = '';

    panchineImg = '';
    panchineBackColor: string = '';

    opereDarteImg = '';
    opereDarteBackColor: string = '';

    fontaneImg = '';
    fontaneBackColor: string = '';

    illumImg = '';
    illumBackColor: string = '';

    accessoWCImg = '';
    accessoWCBackColor: string = '';

  coesSpazImg = ''; 
  coesSpazBackColor: string = '';

  orCiclImg = ''; 
  orCiclBackColor: string = '';

  qualSpazImg = ''; 
  qualSpazBackColor: string = '';

    varietaImg = '';  
    varietaBackColor: string = '';

    penFisImg = '';   
    penFisBackColor: string = '';

    idLuogImg = '';   
    idLuogBackColor: string = '';

    flessImg = '';   
    flessImgBackColor: string = '';

    leggImg = '';   
    leggBackColor: string = ''; 

  buonaVegImg = ''; 
  buonaVegBackColor: string = '';

  
  
  //Metodi

  clickFenUrb(): void{
    this.showDiv = !this.showDiv;
    console.log('showDiv = ' + this.showDiv);
  }

  

  clickOnMarker(){
    //create Overlay
    let overlayContainerElement = document.querySelector('.overlay-container')
    let overlayLayer = new Overlay({
        element: overlayContainerElement,
      })
      MapComponent.mappa!.addOverlay(overlayLayer);

    //click on Map
    MapComponent.mappa!.on('click', (e) =>{
      console.log("click map");
      overlayLayer.setPosition(undefined);
      this.showMenu = false;
      this.markerChildNotify.emit(this.showMenu);

    
      MapComponent.mappa!.forEachFeatureAtPixel(e.pixel, (feature: any, layer: any) =>{
        console.log("click point");
      
        let distretto: Distretto = this.featureHandlerService.getDistrettoById(feature.getId());
        this.distrettoClicked = distretto
        this.addPathForImg(distretto);
        this.addBackColorForImg(distretto);


        console.log('ID in Marker: '+ feature.getId())
        this.markerChildIdDistretto.emit(feature.getId())


        let clickedCoordinate = e.coordinate;
        overlayLayer.setPosition(clickedCoordinate);

        MapComponent.mappa!.getView().setCenter(e.coordinate);
        MapComponent.mappa!.getView().setZoom(7);
        this.showMenu = true;
        console.log('Marker - showMenu: ' + this.showMenu);
        this.markerChildNotify.emit(this.showMenu);
      },
      )}
    )

  }
  

  addPathForImg(distretto: Distretto){
    //Aggiunge il path dell'immagine per ogni fen urb

    this.orPedImg = this.pathImg + distretto.urbanArea.orientamentoPedonale.getIcon();
    this.elAmbImg = this.pathImg + distretto.urbanArea.elementiAmbientali.getIcon();
      this.caffeRistoImg = this.pathImg + distretto.urbanArea.elementiAmbientali.caffeRistoranti.getIcon();
      this.panchineImg = this.pathImg + distretto.urbanArea.elementiAmbientali.panchine.getIcon();
      this.opereDarteImg = this.pathImg + distretto.urbanArea.elementiAmbientali.opereDarte.getIcon();
      this.fontaneImg = this.pathImg + distretto.urbanArea.elementiAmbientali.fontane.getIcon();
      this.illumImg = this.pathImg + distretto.urbanArea.elementiAmbientali.illuminazione.getIcon();
      this.accessoWCImg = this.pathImg + distretto.urbanArea.elementiAmbientali.accessoWC.getIcon();
    this.coesSpazImg = this.pathImg + distretto.urbanArea.coesioneSpaziale.getIcon();
    this.orCiclImg = this.pathImg + distretto.urbanArea.orientamentoCiclabile.getIcon();
    this.qualSpazImg = this.pathImg + distretto.urbanArea.qualitaDelloSpazio.getIcon();
      this.varietaImg = this.pathImg + distretto.urbanArea.qualitaDelloSpazio.varieta.getIcon();
      this.penFisImg = this.pathImg + distretto.urbanArea.qualitaDelloSpazio.penFis.getIcon();
      this.idLuogImg = this.pathImg + distretto.urbanArea.qualitaDelloSpazio.identLuogo.getIcon();
      this.flessImg = this.pathImg + distretto.urbanArea.qualitaDelloSpazio.fless.getIcon();
      this.leggImg = this.pathImg + distretto.urbanArea.qualitaDelloSpazio.legg.getIcon();
    this.buonaVegImg = this.pathImg + distretto.urbanArea.buonaVegetazione.getIcon();
  }

  addBackColorForImg(distretto: Distretto){
    //Prende il colore di ogni fen urb (in italiano), e lo imposta nel css corrispondente
    this.orPedBackColor = distretto.urbanArea.orientamentoPedonale.getColor();
    //alert('orPed: '+ this.orPedBackColor)
    this.orPedBackColor = ColorMapping.setFenUrbColor(this.orPedBackColor);

    this.elAmbBackColor = distretto.urbanArea.elementiAmbientali.getColor();
    //alert('elAmb: '+ this.elAmbBackColor)
    this.elAmbBackColor = ColorMapping.setFenUrbColor(this.elAmbBackColor);
  
      this.caffeRistoBackColor = distretto.urbanArea.elementiAmbientali.caffeRistoranti.getColor();
      this.caffeRistoBackColor = ColorMapping.setFenUrbColor(this.caffeRistoBackColor);
      
      this.panchineBackColor = distretto.urbanArea.elementiAmbientali.panchine.getColor();
      this.panchineBackColor = ColorMapping.setFenUrbColor(this.panchineBackColor);
      
      this.opereDarteBackColor = distretto.urbanArea.elementiAmbientali.opereDarte.getColor();
      this.opereDarteBackColor = ColorMapping.setFenUrbColor(this.opereDarteBackColor);
  
      this.fontaneBackColor = distretto.urbanArea.elementiAmbientali.fontane.getColor();
      this.fontaneBackColor = ColorMapping.setFenUrbColor(this.fontaneBackColor);
  
      this.illumBackColor = distretto.urbanArea.elementiAmbientali.illuminazione.getColor();
      this.illumBackColor = ColorMapping.setFenUrbColor(this.illumBackColor);
  
      this.accessoWCBackColor = distretto.urbanArea.elementiAmbientali.accessoWC.getColor();
      this.accessoWCBackColor = ColorMapping.setFenUrbColor(this.accessoWCBackColor);
  
    this.coesSpazBackColor = distretto.urbanArea.coesioneSpaziale.getColor();
    this.coesSpazBackColor = ColorMapping.setFenUrbColor(this.coesSpazBackColor);
    
    this.orCiclBackColor = distretto.urbanArea.orientamentoCiclabile.getColor();
    this.orCiclBackColor = ColorMapping.setFenUrbColor(this.orCiclBackColor);
    
    this.qualSpazBackColor = distretto.urbanArea.qualitaDelloSpazio.getColor();
    this.qualSpazBackColor = ColorMapping.setFenUrbColor(this.qualSpazBackColor);
      
      this.varietaBackColor = distretto.urbanArea.qualitaDelloSpazio.varieta.getColor();
      this.varietaBackColor = ColorMapping.setFenUrbColor(this.varietaBackColor);
  
      this.penFisBackColor = distretto.urbanArea.qualitaDelloSpazio.penFis.getColor();
      this.penFisBackColor = ColorMapping.setFenUrbColor(this.penFisBackColor);
          
      this.idLuogBackColor = distretto.urbanArea.qualitaDelloSpazio.identLuogo.getColor();
      this.idLuogBackColor = ColorMapping.setFenUrbColor(this.idLuogBackColor);
       
      this.flessImgBackColor = distretto.urbanArea.qualitaDelloSpazio.fless.getColor();
      this.flessImgBackColor = ColorMapping.setFenUrbColor(this.flessImgBackColor);
  
      this.leggBackColor = distretto.urbanArea.qualitaDelloSpazio.legg.getColor();
      this.leggBackColor = ColorMapping.setFenUrbColor(this.leggBackColor); 
  
    this.buonaVegBackColor = distretto.urbanArea.buonaVegetazione.getColor();
    this.buonaVegBackColor = ColorMapping.setFenUrbColor(this.buonaVegBackColor);
  }
 


}
