import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtro-distretto',
  templateUrl: './filtro-distretto.component.html',
  styleUrls: ['./filtro-distretto.component.css']
})
export class FiltroDistrettoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //Proprietà
  showFiltro: boolean = false; 
  valoreFiltro: number = 0;

  showDivFil(){
    this.showFiltro = !this.showFiltro;
  }

  range(){
    let x = <HTMLInputElement>document.getElementById("rangeInput");
    console.log(x!.value);
    this.valoreFiltro =+ x!.value;
  }

  
}
