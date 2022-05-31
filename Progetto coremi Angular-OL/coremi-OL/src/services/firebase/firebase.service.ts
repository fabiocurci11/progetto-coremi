import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Distretto } from '../../app/classi/distretti/distretto';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService{

  items: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.items = db.object('distretti').valueChanges()
        console.log('############ TEST FIREBASE ############')
        console.log(this.items)
   }

  
   retrieveObservableItems(){
    this.items!.forEach(function (value) {
      console.log('idVALUE: ' + value.nomeDistretto);
    });  
  }

  updateDistretto(){
    //this.db.object('distretto1').update({ buonaVeg: '9' })
    //this.db.object('distretto2').update({ buonaVeg: '10' })
    //this.db.object('distretto1/elAmb/newItem').update({ newItem: 9})
    
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

    console.log(id)
    console.log(idDistretto)

    //Salvo fen urb 
    this.db.object('distretti/'+id).update
      ({nomeDistretto: nameDistrict, 
        orientamentoPedonale: orPed,
        coesioneSpaziale: coesSpaz,
        orientamentoCiclabile: orCicl,
        buonaVegetazione: buonVeg,
      })

    let valueElAmb: number = distretto.urbanArea.elementiAmbientali.getValue();
    let caffRist: number = distretto.urbanArea.elementiAmbientali.caffeRistoranti.getValue();
    let panchine: number = distretto.urbanArea.elementiAmbientali.panchine.getValue();
    let opereDarte: number = distretto.urbanArea.elementiAmbientali.opereDarte.getValue();
    let fontane: number = distretto.urbanArea.elementiAmbientali.fontane.getValue();
    let illuminazione: number = distretto.urbanArea.elementiAmbientali.illuminazione.getValue();
    let accessoWC: number = distretto.urbanArea.elementiAmbientali.accessoWC.getValue();
    
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
