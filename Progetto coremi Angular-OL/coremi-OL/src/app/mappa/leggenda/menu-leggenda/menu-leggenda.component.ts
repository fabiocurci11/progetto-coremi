import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { left } from '@popperjs/core';
import { getPointResolution } from 'ol/proj';
import { AreaUrbana } from 'src/app/classi/distretti/areaUrbana';
import { Distretto } from 'src/app/classi/distretti/distretto';
import { BuonaVegetazione } from 'src/app/classi/fenomeni-urbani/BuonaVegetazione';
import { CoesioneSpaziale } from 'src/app/classi/fenomeni-urbani/CoesioneSpaziale';
import { ElementiAmbientali } from 'src/app/classi/fenomeni-urbani/ElementiAmbientali';
import { OrientamentoCiclabile } from 'src/app/classi/fenomeni-urbani/OrientamentoCiclabile';
import { OrientamentoPedonale } from 'src/app/classi/fenomeni-urbani/OrientamentoPedonale';
import { QualitaSpazio } from 'src/app/classi/fenomeni-urbani/QualitaSpazio';
import { FeatureHandlerService } from 'src/services/feature-handler.service';

@Component({
  selector: 'app-menu-leggenda',
  templateUrl: './menu-leggenda.component.html',
  styleUrls: ['./menu-leggenda.component.css']
})
export class MenuLeggendaComponent implements OnInit, AfterViewInit {

  constructor(private detection: ChangeDetectorRef, private featureHandlerService: FeatureHandlerService) { } 

  ngOnInit(): void {
   
  }

  ngAfterViewInit() {

  }

  pathImg = 'assets/fen_urb_icon/';

  coesSpazObj = new CoesioneSpaziale(-1)
  elAmbObj = new ElementiAmbientali()
  qualSpazObj = new QualitaSpazio()
  orPedObj = new OrientamentoPedonale(-1)
  buonaVegObj = new BuonaVegetazione(-1)
  orCiclObj = new OrientamentoCiclabile(-1)

   //Creo area urbana
   areaUrbana = new AreaUrbana('areaUrbanaLegenda', this.coesSpazObj, this.elAmbObj ,this.qualSpazObj, this.orPedObj, this.buonaVegObj, this.orCiclObj);
    
   //Creo distretto
   distretto = new Distretto(-1,'distrettoLegenda', this.areaUrbana);


   //Proprietà
  showLeggenda: boolean = false; 
  infoCorema: boolean = false; 
  nomeCorema: string = '';
  imgCorema: string = '';

  orPedNome: string = this.distretto.urbanArea.orientamentoPedonale.getName()
  orPedImg: string = this.pathImg + this.distretto.urbanArea.orientamentoPedonale.getIcon()

  elAmbNome: string = this.distretto.urbanArea.elementiAmbientali.getName()
  elAmbImg: string = this.pathImg + this.distretto.urbanArea.elementiAmbientali.getIcon()

  coesSpazNome: string = this.distretto.urbanArea.coesioneSpaziale.getName()
  coesSpazImg: string = this.pathImg + this.distretto.urbanArea.coesioneSpaziale.getIcon()

  orCiclNome: string = this.distretto.urbanArea.orientamentoCiclabile.getName()
  orCiclImg: string = this.pathImg + this.distretto.urbanArea.orientamentoCiclabile.getIcon()

  qualSpazNome: string = this.distretto.urbanArea.qualitaDelloSpazio.getName()
  qualSpazImg: string = this.pathImg + this.distretto.urbanArea.qualitaDelloSpazio.getIcon()

  buonaVegNome: string = this.distretto.urbanArea.buonaVegetazione.getName()
  buonaVegImg: string = this.pathImg + this.distretto.urbanArea.buonaVegetazione.getIcon()

  //caffeRistNome: string = this.distretto.urbanArea.elementiAmbientali.caffeRistoranti.getName()
  //caffeRistImg: string = this.pathImg + this.distretto.urbanArea.elementiAmbientali.caffeRistoranti.getIcon()

  //Metodi 

  showDivLeg(): void{
    this.showLeggenda = !this.showLeggenda
    if(this.showLeggenda){
      document.getElementById("container-Leggenda")!.style.left = "30%";
    }
    else if(!this.showLeggenda){
      document.getElementById("container-Leggenda")!.style.left = "0px";
    }
    console.log('showLeg = ' + this.showLeggenda);
  }


  showInfoCorema(nome_corema: string, img_corema: string, e: Event): void{
    //nconsole.log("Event clicked: " + e.);
    this.infoCorema = !this.infoCorema

    this.detection.detectChanges();
    
    this.nomeCorema = nome_corema;
    this.imgCorema = img_corema;
    if(this.infoCorema){ 
      let x = document.getElementById("contcorema");
      console.log(x);
      x!.focus();
    }
  }


  



   

   
}
