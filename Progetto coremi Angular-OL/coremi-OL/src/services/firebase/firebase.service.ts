import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, tap } from 'rxjs';
import { Distretto } from '../../app/classi/distretti/distretto';
import Feature from "ol/Feature";
import Geometry from "ol/geom/Geometry";
import Style from 'ol/style/Style';
import { ColorMapping } from '../ColorMapping';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  //Proprietà
  items: Observable<any>;
  valuesOfFenUrb = new Map<string, number>();
  static varNotify: boolean = false

  constructor(private db: AngularFireDatabase) {
    this.items = db.object('distretti').valueChanges()
    
   }
  
  retrieveObservableItems(id: string, distretto: Distretto, feature: Feature<Geometry>){
    this.items = this.db.object('distretti/'+id).valueChanges()
    
    this.items.forEach( (value) => {
     // alert('in foreach: '+value.nomeDistretto )
      this.setValueFenUrbFromFirebase(distretto, value, feature)
    });  


    
  }

  setValueFenUrbFromFirebase(distretto: Distretto, value: any, feature: Feature<Geometry>){
    //Assegno valori dei fen urb agli oggetti + calcolo colore background
    //alert('in set value fireservice. Color or ped: '+ value.orientamentoPedonale)
    //alert('pre error')
    distretto.urbanArea.orientamentoPedonale.setValue(value.orientamentoPedonale)
    distretto.urbanArea.orientamentoPedonale.calculateColor(value.orientamentoPedonale)

    distretto.urbanArea.elementiAmbientali.setValue(value.elementiAmbientali.valoreElementiAmbientali)
    distretto.urbanArea.elementiAmbientali.calculateColor(value.elementiAmbientali.valoreElementiAmbientali);

      distretto.urbanArea.elementiAmbientali.caffeRistoranti.setValue(value.elementiAmbientali.caffeRistoranti)
      distretto.urbanArea.elementiAmbientali.caffeRistoranti.calculateColor(value.elementiAmbientali.caffeRistoranti)
      
      distretto.urbanArea.elementiAmbientali.panchine.setValue(value.elementiAmbientali.panchine)
      distretto.urbanArea.elementiAmbientali.panchine.calculateColor(value.elementiAmbientali.panchine)

      distretto.urbanArea.elementiAmbientali.opereDarte.setValue(value.elementiAmbientali.opereDarte)
      distretto.urbanArea.elementiAmbientali.opereDarte.calculateColor(value.elementiAmbientali.opereDarte)

      distretto.urbanArea.elementiAmbientali.fontane.setValue(value.elementiAmbientali.fontane)
      distretto.urbanArea.elementiAmbientali.fontane.calculateColor(value.elementiAmbientali.fontane)

      distretto.urbanArea.elementiAmbientali.illuminazione.setValue(value.elementiAmbientali.illuminazione)
      distretto.urbanArea.elementiAmbientali.illuminazione.calculateColor(value.elementiAmbientali.illuminazione)

      distretto.urbanArea.elementiAmbientali.accessoWC.setValue(value.elementiAmbientali.accessoWC)
      distretto.urbanArea.elementiAmbientali.accessoWC.calculateColor(value.elementiAmbientali.accessoWC)
      
    distretto.urbanArea.coesioneSpaziale.setValue(value.coesioneSpaziale)
    distretto.urbanArea.coesioneSpaziale.calculateColor(value.coesioneSpaziale)

    distretto.urbanArea.orientamentoCiclabile.setValue(value.orientamentoCiclabile)
    distretto.urbanArea.orientamentoCiclabile.calculateColor(value.orientamentoCiclabile)

    distretto.urbanArea.qualitaDelloSpazio.setValue(value.qualitaDelloSpazio.valoreQualitaDelloSpazio)
    distretto.urbanArea.qualitaDelloSpazio.calculateColor(value.qualitaDelloSpazio.valoreQualitaDelloSpazio);

      distretto.urbanArea.qualitaDelloSpazio.varieta.setValue(value.qualitaDelloSpazio.varieta)
      distretto.urbanArea.qualitaDelloSpazio.varieta.calculateColor(value.qualitaDelloSpazio.varieta);

      distretto.urbanArea.qualitaDelloSpazio.penFis.setValue(value.qualitaDelloSpazio.penetrabilitaFisica)
      distretto.urbanArea.qualitaDelloSpazio.penFis.calculateColor(value.qualitaDelloSpazio.penetrabilitaFisica)

      distretto.urbanArea.qualitaDelloSpazio.identLuogo.setValue(value.qualitaDelloSpazio.identitaLuogo)
      distretto.urbanArea.qualitaDelloSpazio.identLuogo.calculateColor(value.qualitaDelloSpazio.identitaLuogo)

      distretto.urbanArea.qualitaDelloSpazio.fless.setValue(value.qualitaDelloSpazio.flessibilita)
      distretto.urbanArea.qualitaDelloSpazio.fless.calculateColor(value.qualitaDelloSpazio.flessibilita)

      distretto.urbanArea.qualitaDelloSpazio.legg.setValue(value.qualitaDelloSpazio.leggibilita)
      distretto.urbanArea.qualitaDelloSpazio.legg.calculateColor(value.qualitaDelloSpazio.leggibilita)

    distretto.urbanArea.buonaVegetazione.setValue(value.buonaVegetazione)
    distretto.urbanArea.buonaVegetazione.calculateColor(value.buonaVegetazione)

    //Calcolo indice di felicità (UHI) del distretto
    let uhiDistretto = distretto.calculateUHI()
    //alert(uhiDistretto);
    
    //Calcolo colore del distretto in base all'indice di felicità
    distretto.calculateColor(uhiDistretto);  

    //Imposto l'icona per ogni feature in base al colore
    feature.setStyle(new Style({
      image: ColorMapping.setStyleIconFromColor(distretto.getColore())
    }))

    //Salva/aggiorna i valori presi da firebase in firebase
   // this.saveDistrettoFirebase(distretto)
    FirebaseService.varNotify = true
   
  } 



  //RISOLVERE PROBLEMA SALVATAGGIO VALORI (dovrebbero salvarsi come tipo number ma vengono salvati come tipo string)
  updateDistretto(id: string, distretto: Distretto){
    
    let promise = this.db.object('distretti/'+id).update
      ({
        orientamentoPedonale: distretto.urbanArea.orientamentoPedonale.getValue(),
        coesioneSpaziale: distretto.urbanArea.coesioneSpaziale.getValue(),
        orientamentoCiclabile: distretto.urbanArea.orientamentoCiclabile.getValue(),
        buonaVegetazione: <number>distretto.urbanArea.buonaVegetazione.getValue(),
      })
    
    let promise2 = this.db.object('distretti/'+ id + '/elementiAmbientali').update
      ({
        accessoWC: distretto.urbanArea.elementiAmbientali.accessoWC.getValue(),
        caffeRistoranti: distretto.urbanArea.elementiAmbientali.caffeRistoranti.getValue(),
        fontane: distretto.urbanArea.elementiAmbientali.fontane.getValue(),
        illuminazione: distretto.urbanArea.elementiAmbientali.illuminazione.getValue(),
        opereDarte: distretto.urbanArea.elementiAmbientali.opereDarte.getValue(),
        panchine: distretto.urbanArea.elementiAmbientali.panchine.getValue(),
        valoreElementiAmbientali: distretto.urbanArea.elementiAmbientali.getValue()
        
      })

    let promise3 =   this.db.object('distretti/'+ id + '/qualitaDelloSpazio').update
    ({
      flessibilita: <number>distretto.urbanArea.qualitaDelloSpazio.fless.getValue(),
      identitaLuogo: <number>distretto.urbanArea.qualitaDelloSpazio.identLuogo.getValue(),
      leggibilita: <number>distretto.urbanArea.qualitaDelloSpazio.legg.getValue(),
      penetrabilitaFisica: <number>distretto.urbanArea.qualitaDelloSpazio.penFis.getValue(),
      valoreQualitaDelloSpazio: <number>distretto.urbanArea.qualitaDelloSpazio.getValue(),
      varieta: <number>distretto.urbanArea.qualitaDelloSpazio.varieta.getValue()
      
    })
    
    promise
      .then(_ => console.log('success update'))
      .catch(err => console.log(err, 'You dont have access!'));

    
  }

  

  //Salvo i distretti (valori) presi dal geojson in firebase
  saveDistrettoFirebase(distretto: Distretto){
    let idDistretto = distretto.getId()
    let nameDistrict = distretto.getNome()
    let id = 'id'+ idDistretto;
    let orPed = distretto.urbanArea.orientamentoPedonale.getValue()
    let coesSpaz = distretto.urbanArea.coesioneSpaziale.getValue()
    let orCicl = distretto.urbanArea.orientamentoCiclabile.getValue()
    let buonVeg = distretto.urbanArea.buonaVegetazione.getValue()

    //console.log(id)
    //console.log(idDistretto)

    //Salvo fen urb 
    this.db.object('distretti/'+id).update
      ({nomeDistretto: nameDistrict, 
        orientamentoPedonale: orPed,
        coesioneSpaziale: coesSpaz,
        orientamentoCiclabile: orCicl,
        buonaVegetazione: buonVeg,
      })

    let valueElAmb: number = distretto.urbanArea.elementiAmbientali.getValue();
    //alert(distretto.urbanArea.elementiAmbientali.getValue())
    let caffRist: number = distretto.urbanArea.elementiAmbientali.caffeRistoranti.getValue();
    //alert(distretto.urbanArea.elementiAmbientali.caffeRistoranti.getValue())
    let panchine: number = distretto.urbanArea.elementiAmbientali.panchine.getValue();
    //alert(distretto.urbanArea.elementiAmbientali.panchine.getValue())
    let opereDarte: number = distretto.urbanArea.elementiAmbientali.opereDarte.getValue();
    //alert(distretto.urbanArea.elementiAmbientali.opereDarte.getValue())
    let fontane: number = distretto.urbanArea.elementiAmbientali.fontane.getValue();
   // alert(distretto.urbanArea.elementiAmbientali.fontane.getValue())
    let illuminazione: number = distretto.urbanArea.elementiAmbientali.illuminazione.getValue();
    //alert(distretto.urbanArea.elementiAmbientali.illuminazione.getValue())
    let accessoWC: number = distretto.urbanArea.elementiAmbientali.accessoWC.getValue();
    //alert(distretto.urbanArea.elementiAmbientali.accessoWC.getValue())
    
    //Salvo fen urb composti
    this.db.object('distretti/'+ id + '/elementiAmbientali').update
      ({
        valoreElementiAmbientali: valueElAmb,
        caffeRistoranti: caffRist,
        panchine: panchine,
        opereDarte: opereDarte,
        fontane: fontane,
        illuminazione: illuminazione,
        accessoWC: accessoWC,
      })

      let valueQualSpaz: number = distretto.urbanArea.qualitaDelloSpazio.getValue();
      //alert(distretto.urbanArea.qualitaDelloSpazio.getValue());
      let varieta: number = distretto.urbanArea.qualitaDelloSpazio.varieta.getValue();
      let penFis: number = distretto.urbanArea.qualitaDelloSpazio.penFis.getValue();
      let identLuogo: number = distretto.urbanArea.qualitaDelloSpazio.identLuogo.getValue();
      let fless: number = distretto.urbanArea.qualitaDelloSpazio.fless.getValue();
      let leggib: number = distretto.urbanArea.qualitaDelloSpazio.legg.getValue();

    //Salvo fen urb composti  
    this.db.object('distretti/'+ id + '/qualitaDelloSpazio').update
      ({
        valoreQualitaDelloSpazio: valueQualSpaz,
        varieta: varieta,
        penetrabilitaFisica: penFis,
        identitaLuogo: identLuogo,
        flessibilita: fless,
        leggibilita: leggib,
      })
    
  }
}
