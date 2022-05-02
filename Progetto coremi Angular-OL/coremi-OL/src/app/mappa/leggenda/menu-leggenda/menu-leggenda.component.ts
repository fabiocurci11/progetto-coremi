import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { left } from '@popperjs/core';
import { getPointResolution } from 'ol/proj';

@Component({
  selector: 'app-menu-leggenda',
  templateUrl: './menu-leggenda.component.html',
  styleUrls: ['./menu-leggenda.component.css']
})
export class MenuLeggendaComponent implements OnInit {

  constructor(private detection: ChangeDetectorRef) { } 

  ngOnInit(): void {}

  


   //Proprietà

  showLeggenda: boolean = false; 
  infoCorema: boolean = false; 
  nomeCorema: string = '';
  imgCorema: string = '';

  //Metodi 

  showDivLeg(): void{
    this.showLeggenda = !this.showLeggenda
    if(this.showLeggenda){
      document.getElementById("container-Leggenda")!.style.left = "31%";
    }
    else if(!this.showLeggenda){
      document.getElementById("container-Leggenda")!.style.left = "12px";
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
