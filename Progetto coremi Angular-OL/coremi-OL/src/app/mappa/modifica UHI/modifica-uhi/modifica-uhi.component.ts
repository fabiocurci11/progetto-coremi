import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modifica-uhi',
  templateUrl: './modifica-uhi.component.html',
  styleUrls: ['./modifica-uhi.component.css']
})
export class ModificaUhiComponent implements OnInit {

  constructor() { }

  //Ciclo di vita
  ngOnInit(): void {
    console.log("ModificaUHI - showModUHI: " + this.showModUHI)
  }

  ngOnChanges() {
    console.log("ngOnChange ModificaUHI - showModUHIComp: " + this.showModUHIComp)
  }

  //@Input() dati dal padre (mappa)
  @Input() showModUHIComp: boolean = false;
  

  //Proprietà
  showModUHI: boolean = false; 
  valoreFiltro: number = 0;


  //metodi
  showMenuModUHI(){
    this.showModUHI = !this.showModUHI;
  }

  range(): void{
    let x = <HTMLInputElement>document.getElementById("rangeInput");
    console.log(x!.value);
    this.valoreFiltro =+ x!.value;
  }


}
