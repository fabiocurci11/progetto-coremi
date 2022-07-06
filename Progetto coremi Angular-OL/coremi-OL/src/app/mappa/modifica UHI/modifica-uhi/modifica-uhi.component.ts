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
    this.distretto = this.featureHandlerService.getDistrettoById(this.idDistretto)
    console.log('NOME DISTRETTO: ' + this.distretto.getNome());
    
    this.createTuplaFenUrb(this.distretto)
    this.createTuplaFenUrbElAmb(this.distretto)
    this.createTuplaFenUrbQualSpaz(this.distretto)

    console.log('SHOW DIV EL' + this.showDivEleQS);
    console.log('SHOW DIV QS' + this.showDivQS);
  }

  /*
  ngOnChanges() {
    alert('in on change');
    //console.log("ngOnChange ModificaUHI - showModUHIComp: " + this.showModUHIComp)
    this.distretto = this.featureHandlerService.getDistrettoById(this.idDistretto)
    console.log('NOME DISTRETTO: ' + this.distretto.getNome());
    
    this.createTuplaFenUrb(this.distretto)

    //console.log("ngOnChange ModificaUHI - showDivEleQS: " + this.showDivEleQS)
    //alert(''+this.showDivEleQS)
    
  }
  */
 
  trackByProductId(index: number, product: any) {  
    //alert(product[4])
    return product[4];  
  } 


  //@Input() dati dal padre (mappa)
  @Input() showModUHIComp: boolean = false;
  @Input() idDistretto: number = 0;

  @Input() showDivEleQS: boolean = false
  @Input() showDivQS: boolean = false

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
  tuplaQualSpaz: [string, string, number, string][] = []

  createTuplaFenUrb(distretto: Distretto){
    this.tupla!.push([this.pathImg + distretto.urbanArea.orientamentoPedonale.getIcon(), distretto.urbanArea.orientamentoPedonale.getName(), distretto.urbanArea.orientamentoPedonale.getValue(),'rangeInput1'])
    this.tupla!.push([this.pathImg + distretto.urbanArea.elementiAmbientali.getIcon(), distretto.urbanArea.elementiAmbientali.getName(), distretto.urbanArea.elementiAmbientali.getValue(),'rangeInput2'])
    this.tupla!.push([this.pathImg + distretto.urbanArea.coesioneSpaziale.getIcon(), distretto.urbanArea.coesioneSpaziale.getName(), distretto.urbanArea.coesioneSpaziale.getValue(),'rangeInput3'])
    this.tupla!.push([this.pathImg + distretto.urbanArea.orientamentoCiclabile.getIcon(), distretto.urbanArea.orientamentoCiclabile.getName(), distretto.urbanArea.orientamentoCiclabile.getValue(),'rangeInput4'])
    this.tupla!.push([this.pathImg + distretto.urbanArea.qualitaDelloSpazio.getIcon(), distretto.urbanArea.qualitaDelloSpazio.getName(), distretto.urbanArea.qualitaDelloSpazio.getValue(),'rangeInput5'])
    this.tupla!.push([this.pathImg + distretto.urbanArea.buonaVegetazione.getIcon(), distretto.urbanArea.buonaVegetazione.getName(), distretto.urbanArea.buonaVegetazione.getValue(),'rangeInput6'])
  }

  createTuplaFenUrbElAmb(distretto: Distretto){
    this.tuplaElAmb!.push([this.pathImg + distretto.urbanArea.elementiAmbientali.caffeRistoranti.getIcon(), distretto.urbanArea.elementiAmbientali.caffeRistoranti.getName(), distretto.urbanArea.elementiAmbientali.caffeRistoranti.getValue(),'rangeInput7'])
    this.tuplaElAmb!.push([this.pathImg + distretto.urbanArea.elementiAmbientali.panchine.getIcon(), distretto.urbanArea.elementiAmbientali.panchine.getName(), distretto.urbanArea.elementiAmbientali.panchine.getValue(),'rangeInput8'])
    this.tuplaElAmb!.push([this.pathImg + distretto.urbanArea.elementiAmbientali.opereDarte.getIcon(), distretto.urbanArea.elementiAmbientali.opereDarte.getName(), distretto.urbanArea.elementiAmbientali.opereDarte.getValue(),'rangeInput9'])
    this.tuplaElAmb!.push([this.pathImg + distretto.urbanArea.elementiAmbientali.fontane.getIcon(), distretto.urbanArea.elementiAmbientali.fontane.getName(), distretto.urbanArea.elementiAmbientali.fontane.getValue(),'rangeInput10'])
    this.tuplaElAmb!.push([this.pathImg + distretto.urbanArea.elementiAmbientali.illuminazione.getIcon(), distretto.urbanArea.elementiAmbientali.illuminazione.getName(), distretto.urbanArea.elementiAmbientali.illuminazione.getValue(),'rangeInput11'])
    this.tuplaElAmb!.push([this.pathImg + distretto.urbanArea.elementiAmbientali.accessoWC.getIcon(), distretto.urbanArea.elementiAmbientali.accessoWC.getName(), distretto.urbanArea.elementiAmbientali.accessoWC.getValue(),'rangeInput12'])
  }

  createTuplaFenUrbQualSpaz(distretto: Distretto){
    this.tuplaQualSpaz!.push([this.pathImg + distretto.urbanArea.qualitaDelloSpazio.varieta.getIcon(), distretto.urbanArea.qualitaDelloSpazio.varieta.getName(), distretto.urbanArea.qualitaDelloSpazio.varieta.getValue(),'rangeInput13'])
    this.tuplaQualSpaz!.push([this.pathImg + distretto.urbanArea.qualitaDelloSpazio.penFis.getIcon(), distretto.urbanArea.qualitaDelloSpazio.penFis.getName(), distretto.urbanArea.qualitaDelloSpazio.penFis.getValue(),'rangeInput14'])
    this.tuplaQualSpaz!.push([this.pathImg + distretto.urbanArea.qualitaDelloSpazio.identLuogo.getIcon(), distretto.urbanArea.qualitaDelloSpazio.identLuogo.getName(), distretto.urbanArea.qualitaDelloSpazio.identLuogo.getValue(),'rangeInput15'])
    this.tuplaQualSpaz!.push([this.pathImg + distretto.urbanArea.qualitaDelloSpazio.fless.getIcon(), distretto.urbanArea.qualitaDelloSpazio.fless.getName(), distretto.urbanArea.qualitaDelloSpazio.fless.getValue(),'rangeInput16'])
    this.tuplaQualSpaz!.push([this.pathImg + distretto.urbanArea.qualitaDelloSpazio.legg.getIcon(), distretto.urbanArea.qualitaDelloSpazio.legg.getName(), distretto.urbanArea.qualitaDelloSpazio.legg.getValue(),'rangeInput17'])

    //this.tuplaQualSpaz!.push([this.pathImg + distretto.urbanArea.qualitaDelloSpazio.getIcon(), distretto.urbanArea.qualitaDelloSpazio.getName(), distretto.urbanArea.qualitaDelloSpazio.getValue(),'rangeInput18'])
  }

  //metodi
  showMenuModUHI(){
    this.showModUHI = !this.showModUHI;
  }

 

  saveOnFirebase(){
    alert("Modifiche effettuate con successo!");
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


    //elAmbientali

    if(idRange == 'rangeInput7'){
      //Buona vegetazione
      console.log("rangeinput7")
      this.tuplaElAmb[0][2] =   <number><unknown>valueUHI!.value
      console.log('tupls: ' + this.tuplaElAmb[0])
    }

    if(idRange == 'rangeInput8'){
      //Buona vegetazione
      console.log("rangeinput8")
      this.tuplaElAmb[1][2] =   <number><unknown>valueUHI!.value
      console.log('tupls: ' + this.tuplaElAmb[1])
    }

    if(idRange == 'rangeInput9'){
      //Buona vegetazione
      console.log("rangeinput9")
      this.tuplaElAmb[2][2] =   <number><unknown>valueUHI!.value
      console.log('tupls: ' + this.tuplaElAmb[2])
    }

    if(idRange == 'rangeInput10'){
      //Buona vegetazione
      console.log("rangeinput10")
      this.tuplaElAmb[3][2] =   <number><unknown>valueUHI!.value
      console.log('tupls: ' + this.tuplaElAmb[3])
    }

    if(idRange == 'rangeInput11'){
      //Buona vegetazione
      console.log("rangeinput11")
      this.tuplaElAmb[4][2] =   <number><unknown>valueUHI!.value
      console.log('tupls: ' + this.tuplaElAmb[4])
    }

    if(idRange == 'rangeInput12'){
      //Buona vegetazione
      console.log("rangeinput12")
      this.tuplaElAmb[5][2] =   <number><unknown>valueUHI!.value
      console.log('tupls: ' + this.tuplaElAmb[5])
    }


    //qualSpazio

    if(idRange == 'rangeInput13'){
      //Buona vegetazione
      console.log("rangeinput13")
      this.tuplaQualSpaz[0][2] =   <number><unknown>valueUHI!.value
      console.log('tupls: ' + this.tuplaQualSpaz[0])
    }

    if(idRange == 'rangeInput14'){
      //Buona vegetazione
      console.log("rangeinput14")
      this.tuplaQualSpaz[1][2] =   <number><unknown>valueUHI!.value
      console.log('tupls: ' + this.tuplaQualSpaz[1])
    }

    if(idRange == 'rangeInput15'){
      //Buona vegetazione
      console.log("rangeinput15")
      this.tuplaQualSpaz[2][2] =   <number><unknown>valueUHI!.value
      console.log('tupls: ' + this.tuplaQualSpaz[2])
    }

    if(idRange == 'rangeInput16'){
      //Buona vegetazione
      console.log("rangeinput16")
      this.tuplaQualSpaz[3][2] =   <number><unknown>valueUHI!.value
      console.log('tupls: ' + this.tuplaQualSpaz[3])
    }

    if(idRange == 'rangeInput17'){
      //Buona vegetazione
      console.log("rangeinput17")
      this.tuplaQualSpaz[4][2] =   <number><unknown>valueUHI!.value
      console.log('tupls: ' + this.tuplaQualSpaz[4])
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
    
    this.distretto.urbanArea.elementiAmbientali.caffeRistoranti.setValue(this.tuplaElAmb[0][2])
    this.distretto.urbanArea.elementiAmbientali.panchine.setValue(this.tuplaElAmb[1][2])
    this.distretto.urbanArea.elementiAmbientali.opereDarte.setValue(this.tuplaElAmb[2][2])
    this.distretto.urbanArea.elementiAmbientali.fontane.setValue(this.tuplaElAmb[3][2])
    this.distretto.urbanArea.elementiAmbientali.illuminazione.setValue(this.tuplaElAmb[4][2])    
    this.distretto.urbanArea.elementiAmbientali.accessoWC.setValue(this.tuplaElAmb[5][2])   

    let valueUHIElAmb = this.distretto.urbanArea.elementiAmbientali.calculateUHIElemAmb()
    this.distretto.urbanArea.elementiAmbientali.calculateColor(valueUHIElAmb)
    
    this.distretto.urbanArea.elementiAmbientali.setValue(valueUHIElAmb)  

    this.distretto.urbanArea.qualitaDelloSpazio.varieta.setValue(this.tuplaQualSpaz[0][2])
    this.distretto.urbanArea.qualitaDelloSpazio.penFis.setValue(this.tuplaQualSpaz[1][2])
    this.distretto.urbanArea.qualitaDelloSpazio.identLuogo.setValue(this.tuplaQualSpaz[2][2])
    this.distretto.urbanArea.qualitaDelloSpazio.fless.setValue(this.tuplaQualSpaz[3][2])
    this.distretto.urbanArea.qualitaDelloSpazio.legg.setValue(this.tuplaQualSpaz[4][2])  
    
    let valueUHIQualSpaz = this.distretto.urbanArea.qualitaDelloSpazio.calculateUHIQualSpaz()
    this.distretto.urbanArea.qualitaDelloSpazio.calculateColor(valueUHIQualSpaz)
    
    this.distretto.urbanArea.qualitaDelloSpazio.setValue(valueUHIQualSpaz)    
      
  }

  
  


}
