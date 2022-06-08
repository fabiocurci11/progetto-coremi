import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Distretto } from 'src/app/classi/distretti/distretto';
import { FeatureHandlerService } from 'src/services/feature-handler.service';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Component({
  selector: 'app-modifica-uhi',
  templateUrl: './modifica-uhi.component.html',
  styleUrls: ['./modifica-uhi.component.css']
})
export class ModificaUhiComponent implements OnInit {

  constructor(private featureHandlerService: FeatureHandlerService, private firebaseService: FirebaseService) { }

  //Ciclo di vita
  ngOnInit(): void {
    console.log("ModificaUHI - showModUHI: " + this.showModUHI)
    console.log("ModificaUHI - idDistretto: "+ this.idDistretto);
  }

  ngOnChanges() {
    //console.log("ngOnChange ModificaUHI - showModUHIComp: " + this.showModUHIComp)
    this.distretto = this.featureHandlerService.getDistrettoById(this.idDistretto)
    console.log('NOME DISTRETTO: ' + this.distretto.getNome());
    
    this.createTuplaFenUrb(this.distretto)
  }

  //@Input() dati dal padre (mappa)
  @Input() showModUHIComp: boolean = false;
  @Input() idDistretto: number = 0;

  //@Output() dati da passare al padre (mappa)
  @Output() modUhiChildUpdateBackColorFenUrb: EventEmitter<boolean> = new EventEmitter<boolean>()
  updateBackColorFenUrb: boolean = false
  

  //Proprietà
  showModUHI: boolean = false; 
  valueOfRange = 0;
  distretto!: Distretto 
  pathImg = 'assets/fen_urb_icon/';

  //tuple
  tupla: [string, string, number, string][] = [] //= [["Steve", "prova", 9], ["Steve", "prova", 7], ["Steve", "prova", 8]]
  tuplaElAmb: [string, string, number, string][] = []

  createTuplaFenUrb(distretto: Distretto){
    this.tupla!.push([this.pathImg + distretto.urbanArea.orientamentoPedonale.getIcon(), distretto.urbanArea.orientamentoPedonale.getName(), distretto.urbanArea.orientamentoPedonale.getValue(),'rangeInput1'])
    this.tupla!.push([this.pathImg + distretto.urbanArea.elementiAmbientali.getIcon(), distretto.urbanArea.elementiAmbientali.getName(), distretto.urbanArea.elementiAmbientali.getValue(),'rangeInput2'])
    this.tupla!.push([this.pathImg + distretto.urbanArea.coesioneSpaziale.getIcon(), distretto.urbanArea.coesioneSpaziale.getName(), distretto.urbanArea.coesioneSpaziale.getValue(),'rangeInput3'])
    this.tupla!.push([this.pathImg + distretto.urbanArea.orientamentoCiclabile.getIcon(), distretto.urbanArea.orientamentoCiclabile.getName(), distretto.urbanArea.orientamentoCiclabile.getValue(),'rangeInput4'])
    this.tupla!.push([this.pathImg + distretto.urbanArea.qualitaDelloSpazio.getIcon(), distretto.urbanArea.qualitaDelloSpazio.getName(), distretto.urbanArea.qualitaDelloSpazio.getValue(),'rangeInput5'])
    this.tupla!.push([this.pathImg + distretto.urbanArea.buonaVegetazione.getIcon(), distretto.urbanArea.buonaVegetazione.getName(), distretto.urbanArea.buonaVegetazione.getValue(),'rangeInput6'])
  }

  createTuplaFenUrbElAmb(distretto: Distretto){
    this.tuplaElAmb!.push([distretto.urbanArea.elementiAmbientali.caffeRistoranti.getIcon(), distretto.urbanArea.elementiAmbientali.caffeRistoranti.getName(), distretto.urbanArea.elementiAmbientali.caffeRistoranti.getValue(),'rangeInput7'])
    this.tuplaElAmb!.push([distretto.urbanArea.elementiAmbientali.panchine.getIcon(), distretto.urbanArea.elementiAmbientali.panchine.getName(), distretto.urbanArea.elementiAmbientali.panchine.getValue(),'rangeInput8'])
    this.tuplaElAmb!.push([distretto.urbanArea.elementiAmbientali.opereDarte.getIcon(), distretto.urbanArea.elementiAmbientali.opereDarte.getName(), distretto.urbanArea.elementiAmbientali.opereDarte.getValue(),'rangeInput9'])
    this.tuplaElAmb!.push([distretto.urbanArea.elementiAmbientali.fontane.getIcon(), distretto.urbanArea.elementiAmbientali.fontane.getName(), distretto.urbanArea.elementiAmbientali.fontane.getValue(),'rangeInput10'])
    this.tuplaElAmb!.push([distretto.urbanArea.elementiAmbientali.illuminazione.getIcon(), distretto.urbanArea.elementiAmbientali.illuminazione.getName(), distretto.urbanArea.elementiAmbientali.illuminazione.getValue(),'rangeInput11'])
    this.tuplaElAmb!.push([distretto.urbanArea.elementiAmbientali.accessoWC.getIcon(), distretto.urbanArea.elementiAmbientali.accessoWC.getName(), distretto.urbanArea.elementiAmbientali.accessoWC.getValue(),'rangeInput12'])
  }

  //metodi
  showMenuModUHI(){
    this.showModUHI = !this.showModUHI;
  }

 

  saveOnFirebase(){
    console.log('ID DISTRETTO: ' + this.distretto!.getId())
    let idString = 'id'
    idString = idString + this.distretto!.getId()
    console.log('ID string: ' + idString)
    this.mapValueOfTuplaToDistretto();
    this.firebaseService.updateDistretto(idString, this.distretto);
    this.modUhiChildUpdateBackColorFenUrb.emit(this.updateBackColorFenUrb)
    
  }

  

  updateValueRange(idRange: string): void{
    let valueUHI = <HTMLInputElement>document.getElementById(idRange);
    //console.log('value: '+valueUHI!.value);

    if(idRange == 'rangeInput1') {
      //OrientamentoPedonale
      console.log("rangeinput1")
      console.log("valueOfRange: " + this.valueOfRange)
    
      this.tupla[0][2] =   <number><unknown>valueUHI!.value
      console.log('tupls: ' + this.tupla[0])
    }

    if(idRange == 'rangeInput2'){
      //Elementi Ambientali
      console.log("rangeinput2")
      this.tupla[1][2] =   <number><unknown>valueUHI!.value
      console.log('tupls: ' + this.tupla[1])
    }

    if(idRange == 'rangeInput3') {
      //Coesione spaziale
      console.log("rangeinput3")
      console.log("valueOfRange: " + this.valueOfRange)
    
      this.tupla[2][2] =   <number><unknown>valueUHI!.value
      console.log('tupls: ' + this.tupla[2])
    }

    if(idRange == 'rangeInput4'){
      //Orientamento ciclabile
      console.log("rangeinput4")
      this.tupla[3][2] =   <number><unknown>valueUHI!.value
      console.log('tupls: ' + this.tupla[3])
    }

    if(idRange == 'rangeInput5') {
      //Qualità dello spazio
      console.log("rangeinput5")
      console.log("valueOfRange: " + this.valueOfRange)
    
      this.tupla[4][2] =   <number><unknown>valueUHI!.value
      console.log('tupls: ' + this.tupla[4])
    }
    if(idRange == 'rangeInput6'){
      //Buona vegetazione
      console.log("rangeinput6")
      this.tupla[5][2] =   <number><unknown>valueUHI!.value
      console.log('tupls: ' + this.tupla[5])
    }
  }

  mapValueOfTuplaToDistretto(): void{
    console.log(this.tupla[0][1]+' '+this.tupla[0][2])
    console.log(this.tupla[1][1]+' '+this.tupla[1][2])
    console.log(this.tupla[2][1]+' '+this.tupla[2][2])
    console.log(this.tupla[3][1]+' '+this.tupla[3][2])
    console.log(this.tupla[4][1]+' '+this.tupla[4][2])
    console.log(this.tupla[5][1]+' '+this.tupla[5][2])
    
    this.distretto.urbanArea.orientamentoPedonale.setValue(this.tupla[0][2])
    this.distretto.urbanArea.elementiAmbientali.setValue(this.tupla[1][2])
    this.distretto.urbanArea.coesioneSpaziale.setValue(this.tupla[2][2])
    this.distretto.urbanArea.orientamentoCiclabile.setValue(this.tupla[3][2])
    this.distretto.urbanArea.qualitaDelloSpazio.setValue(this.tupla[4][2])    
    this.distretto.urbanArea.buonaVegetazione.setValue(this.tupla[5][2])    
  }

  
  


}
