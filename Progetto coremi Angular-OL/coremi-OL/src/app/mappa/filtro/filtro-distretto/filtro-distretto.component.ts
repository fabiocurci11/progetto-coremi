import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtro-distretto',
  templateUrl: './filtro-distretto.component.html',
  styleUrls: ['./filtro-distretto.component.css']
})
export class FiltroDistrettoComponent implements OnInit {

  constructor() { }

  //Ciclo di vita
  ngOnInit(): void {
    console.log("Filtro - showFiltroComp: " + this.showFiltroComp)
  }

  ngOnChanges() {
    console.log("ngOnChange Filtro - showFiltroComp: " + this.showFiltroComp)
  }

  //Proprietà
  showFiltro: boolean = false; 
  valoreFiltro: number = 0;

  //@Input() dati dal padre (mappa)
  @Input() showFiltroComp: boolean = false;


  //Metodi
  showDivFil(){
    this.showFiltro = !this.showFiltro;
  }

  range(): void{
    let x = <HTMLInputElement>document.getElementById("rangeInput");
    console.log(x!.value);
    this.valoreFiltro =+ x!.value;
  }

  
}
