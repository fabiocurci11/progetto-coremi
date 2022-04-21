import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-leggenda',
  templateUrl: './menu-leggenda.component.html',
  styleUrls: ['./menu-leggenda.component.css']
})
export class MenuLeggendaComponent implements OnInit {

  constructor() { } 

  ngOnInit(): void {
  }
 
   //Proprietà

  showLeggenda: boolean = false;
 

  //Metodi 

  showDivLeg(): void{
    this.showLeggenda = !this.showLeggenda
    console.log('showLeg = ' + this.showLeggenda);
  }




   

   
}
