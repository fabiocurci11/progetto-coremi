import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Map, Overlay } from 'ol';
import { Coordinate } from 'ol/coordinate';
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
      this.addBackColorForImg(this.distrettoClicked2)
      //alert(this.distrettoClicked.urbanArea.orientamentoPedonale.getColor())
    }
    //alert(FirebaseService.varNotify)
    if(FirebaseService.varNotify){
      this.addBackColorForImg(this.distrettoClicked)
      this.addBackColorForImg(this.distrettoClicked2)
    }
  }

  //Proprietà
  showDiv: boolean = true;
  showDivQS: boolean = true
  showMenu: boolean = false;
  showMenuLegenda: boolean = false;
  figlioString: string = 'string figlio';
  distrettoClicked!: Distretto
  distrettoClicked2!: Distretto
  
  //@Output() dati dal figlio (marker) al padre (mappa)
 
  @Output() markerChildNotify: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Output() markerChildIdDistretto: EventEmitter<number> = new EventEmitter<number>()

  @Output() showDivELeQS: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Output() showDivQSModUhi: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Output() markerNotifyLegenda: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Input() updateBackColorFenUrb: boolean = false;

  //Proprietà distretti (img fen urb)
  pathImg = 'assets/fen_urb_icon/';

  //var Img impostano l'immagine, var BackColor impostano il colore dello sfondo dell'immagine
  orPedImg = '';
  orPedBackColor: string = '';
  orPedBackColor2: string = '';

  elAmbImg = '';
  elAmbBackColor: string = '';
  elAmbBackColor2: string = '';

    caffeRistoImg = '';
    caffeRistoBackColor: string = '';
    caffeRistoBackColor2: string = '';

    panchineImg = '';
    panchineBackColor: string = '';
    panchineBackColor2: string = '';

    opereDarteImg = '';
    opereDarteBackColor: string = '';
    opereDarteBackColor2: string = '';

    fontaneImg = '';
    fontaneBackColor: string = '';
    fontaneBackColor2: string = '';

    illumImg = '';
    illumBackColor: string = '';
    illumBackColor2: string = '';

    accessoWCImg = '';
    accessoWCBackColor: string = '';
    accessoWCBackColor2: string = '';

  coesSpazImg = ''; 
  coesSpazBackColor: string = '';
  coesSpazBackColor2: string = '';

  orCiclImg = ''; 
  orCiclBackColor: string = '';
  orCiclBackColor2: string = '';

  qualSpazImg = ''; 
  qualSpazBackColor: string = '';
  qualSpazBackColor2: string = '';

    varietaImg = '';  
    varietaBackColor: string = '';
    varietaBackColor2: string = '';

    penFisImg = '';   
    penFisBackColor: string = '';
    penFisBackColor2: string = '';

    idLuogImg = '';   
    idLuogBackColor: string = '';
    idLuogBackColor2: string = '';

    flessImg = '';   
    flessImgBackColor: string = '';
    flessImgBackColor2: string = '';

    leggImg = '';   
    leggBackColor: string = ''; 
    leggBackColor2: string = ''; 

  buonaVegImg = ''; 
  buonaVegBackColor: string = '';
  buonaVegBackColor2: string = '';

  showDivElEsp: boolean = false
  showDivQsEst: boolean = false
  
  //Metodi

  clickFenUrbElAmb(): void{
    this.showDiv = !this.showDiv;

    this.showDivElEsp = !this.showDivElEsp
    this.showDivELeQS.emit(this.showDivElEsp)
  }

  clickFenUrbQualSpaz(): void{
    this.showDivQS = !this.showDivQS;
    this.showDiv = !this.showDiv 
    
    this.showDivQsEst = !this.showDivQsEst
    this.showDivQSModUhi.emit(this.showDivQsEst)
  }

  displayedFeatures = 0
  clickedOnEmptyArea!: boolean
  firstOverlay: boolean = false
  clickFirstDistretto: boolean = false
  coordinate2!: Coordinate
  clickedCoordinate!: Coordinate
  resetOverlay: boolean = true
  comparisonDistretti: boolean = false
  nomeDistretto2!: string;
  nomeDistretto!: string;
  overlayLayer2!: Overlay
  overlayLayer!: Overlay

  clickOnMarker(){
    //create Overlay
    let overlayContainerElement = document.querySelector('.overlay-container')
    this.overlayLayer = new Overlay({
        element: overlayContainerElement,
    })
    MapComponent.mappa!.addOverlay(this.overlayLayer);

    let overlayContainerElement2 = document.querySelector('.overlay-container2')
    this.overlayLayer2 = new Overlay({
        element: overlayContainerElement2,
    })
    MapComponent.mappa!.addOverlay(this.overlayLayer2);

    //click on Map
    MapComponent.mappa!.on('click', (e) =>{
      console.log("click map");
      //this.i = 0;
      this.overlayLayer.setPosition(undefined);
      this.overlayLayer2.setPosition(undefined);
      this.showMenu = false;
      this.markerChildNotify.emit(this.showMenu);

      this.showMenuLegenda = false;
      this.markerNotifyLegenda.emit(this.showMenuLegenda)
      this.clickedOnEmptyArea = MapComponent.mappa!.getFeaturesAtPixel(e.pixel).length==0
      //alert(MapComponent.mappa!.getFeaturesAtPixel())
      if(this.clickedOnEmptyArea || this.displayedFeatures==2) {
        this.displayedFeatures = 0;
      }

      

      if(this.resetOverlay == false){
        //alert('set resetOverlay '+this.resetOverlay);
        this.firstOverlay = false
        this.resetOverlay = true
        this.comparisonDistretti = false
      } 
    
      //alert('firstOv: '+this.firstOverlay + ' clickFirstDistr: '+this.clickFirstDistretto + ' resetOv: '+this.resetOverlay)
     
      if(this.firstOverlay == true && this.clickFirstDistretto == false && this.resetOverlay == true){
        //this.resetOverlay = false
      }

    
      MapComponent.mappa!.forEachFeatureAtPixel(e.pixel, (feature: any, layer: any) =>{        
        //if(this.firstOverlay == false){
        if(this.displayedFeatures == 0){  
          //Setto i valori da visualizzare del distretto cliccato
          let distretto2: Distretto = this.featureHandlerService.getDistrettoById(feature.getId());
          this.distrettoClicked2 = distretto2
          this.addPathForImg(distretto2);
          this.addBackColorForImg2(distretto2);
          this.nomeDistretto2 = distretto2.getNome()

          this.displayedFeatures=1
          this.coordinate2 = e.coordinate;
          this.firstOverlay = true
          this.clickFirstDistretto = true
          this.overlayLayer2.setPosition(this.coordinate2);
          
          //MapComponent.mappa!.getView().setCenter(e.coordinate);
          //MapComponent.mappa!.getView().setZoom(14);
        }


        //else if(this.resetOverlay == true && this.firstOverlay == true  && this.clickFirstDistretto == true){
        else if(this.displayedFeatures == 1){
          //Setto i valori da visualizzare del distretto cliccato
          let distretto: Distretto = this.featureHandlerService.getDistrettoById(feature.getId());
          this.distrettoClicked = distretto
          this.addPathForImg(distretto);
          this.addBackColorForImg(distretto);
          this.nomeDistretto = distretto.getNome()
          
          this.clickedCoordinate = e.coordinate;
          
          this.overlayLayer2.setPosition(this.coordinate2);
          this.overlayLayer.setPosition(this.clickedCoordinate);

          //MapComponent.mappa!.getView().setCenter(e.coordinate);
          //MapComponent.mappa!.getView().setZoom(14);

          this.resetOverlay = false
          this.comparisonDistretti = true
          this.displayedFeatures = 2
        }


        this.markerChildIdDistretto.emit(feature.getId())
        this.showMenu = true;
        console.log('Marker - showMenu: ' + this.showMenu);
        this.markerChildNotify.emit(this.showMenu);
        
        //Nascondere i 2 menu legenda
        this.showMenuLegenda = true;
        this.markerNotifyLegenda.emit(this.showMenuLegenda)
      },
      )}
    )

  }

  eliminaConfronto(){
    alert('Confronto eliminato')
    this.overlayLayer.setPosition(undefined);
    this.overlayLayer2.setPosition(undefined);
    /*
    if(this.resetOverlay == false){
      alert('set resetOverlay '+this.resetOverlay);
      this.firstOverlay = false
      this.resetOverlay = true
      this.comparisonDistretti = false
      this.overlayLayer.setPosition(undefined);
      this.overlayLayer2.setPosition(undefined);

      this.showMenu = false;
      this.markerChildNotify.emit(this.showMenu);
      this.showMenuLegenda = false;
      this.markerNotifyLegenda.emit(this.showMenuLegenda)
    }*/
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
    //alert('backgrond color for img');
    //Prende il colore di ogni fen urb (in italiano), e lo imposta nel css corrispondente
    this.orPedBackColor = distretto.urbanArea.orientamentoPedonale.getColor();
    //alert('orPed: '+ this.orPedBackColor)
    this.orPedBackColor = ColorMapping.setFenUrbColor(this.orPedBackColor);

    this.elAmbBackColor = distretto.urbanArea.elementiAmbientali.getColor();
    //alert('elAmb: '+ this.elAmbBackColor)
    this.elAmbBackColor = ColorMapping.setFenUrbColor(this.elAmbBackColor);
    //alert(this.elAmbBackColor)
  
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

  addBackColorForImg2(distretto: Distretto){
    //alert('backgrond color for img');
    //Prende il colore di ogni fen urb (in italiano), e lo imposta nel css corrispondente
    this.orPedBackColor2 = distretto.urbanArea.orientamentoPedonale.getColor();
    //alert('orPed: '+ this.orPedBackColor)
    this.orPedBackColor2 = ColorMapping.setFenUrbColor(this.orPedBackColor2);

    this.elAmbBackColor2 = distretto.urbanArea.elementiAmbientali.getColor();
    //alert('elAmb: '+ this.elAmbBackColor)
    this.elAmbBackColor2 = ColorMapping.setFenUrbColor(this.elAmbBackColor2);
    //alert(this.elAmbBackColor)
  
      this.caffeRistoBackColor2 = distretto.urbanArea.elementiAmbientali.caffeRistoranti.getColor();
      this.caffeRistoBackColor2 = ColorMapping.setFenUrbColor(this.caffeRistoBackColor2);
      
      this.panchineBackColor2 = distretto.urbanArea.elementiAmbientali.panchine.getColor();
      this.panchineBackColor2 = ColorMapping.setFenUrbColor(this.panchineBackColor2);
      
      this.opereDarteBackColor2 = distretto.urbanArea.elementiAmbientali.opereDarte.getColor();
      this.opereDarteBackColor2 = ColorMapping.setFenUrbColor(this.opereDarteBackColor2);
  
      this.fontaneBackColor2 = distretto.urbanArea.elementiAmbientali.fontane.getColor();
      this.fontaneBackColor2 = ColorMapping.setFenUrbColor(this.fontaneBackColor2);
  
      this.illumBackColor2 = distretto.urbanArea.elementiAmbientali.illuminazione.getColor();
      this.illumBackColor2 = ColorMapping.setFenUrbColor(this.illumBackColor2);
  
      this.accessoWCBackColor2 = distretto.urbanArea.elementiAmbientali.accessoWC.getColor();
      this.accessoWCBackColor2 = ColorMapping.setFenUrbColor(this.accessoWCBackColor2);
  
    this.coesSpazBackColor2 = distretto.urbanArea.coesioneSpaziale.getColor();
    this.coesSpazBackColor2 = ColorMapping.setFenUrbColor(this.coesSpazBackColor2);
    
    this.orCiclBackColor2 = distretto.urbanArea.orientamentoCiclabile.getColor();
    this.orCiclBackColor2 = ColorMapping.setFenUrbColor(this.orCiclBackColor2);
    
    this.qualSpazBackColor2 = distretto.urbanArea.qualitaDelloSpazio.getColor();
    this.qualSpazBackColor2 = ColorMapping.setFenUrbColor(this.qualSpazBackColor2);
      
      this.varietaBackColor2 = distretto.urbanArea.qualitaDelloSpazio.varieta.getColor();
      this.varietaBackColor2 = ColorMapping.setFenUrbColor(this.varietaBackColor2);
  
      this.penFisBackColor2 = distretto.urbanArea.qualitaDelloSpazio.penFis.getColor();
      this.penFisBackColor2 = ColorMapping.setFenUrbColor(this.penFisBackColor2);
          
      this.idLuogBackColor2 = distretto.urbanArea.qualitaDelloSpazio.identLuogo.getColor();
      this.idLuogBackColor2 = ColorMapping.setFenUrbColor(this.idLuogBackColor2);
       
      this.flessImgBackColor2 = distretto.urbanArea.qualitaDelloSpazio.fless.getColor();
      this.flessImgBackColor2 = ColorMapping.setFenUrbColor(this.flessImgBackColor2);
  
      this.leggBackColor2 = distretto.urbanArea.qualitaDelloSpazio.legg.getColor();
      this.leggBackColor2 = ColorMapping.setFenUrbColor(this.leggBackColor2); 
  
    this.buonaVegBackColor2 = distretto.urbanArea.buonaVegetazione.getColor();
    this.buonaVegBackColor2 = ColorMapping.setFenUrbColor(this.buonaVegBackColor2);
  }
 
 

}
