import { Injectable } from '@angular/core';
import { Corema } from './coremi';

@Injectable({
  providedIn: 'root'
})
export class FenomenoUrbanoService implements Corema {

  //property from interface
  name: string = '';
  type: string = '';
  means: string = '';
  icon: string = '';

  //proprietà
  value: number = 0
  color: string = ''; 

  createFenUrb(nome: string, tipo: string, significato: string, icona: string, valore: number, colore: string): void{
    this.name = nome;
    this.type = tipo;
    this.means = significato;
    this.icon = icona;
    this.value = valore;
    this.color = colore;
  }

  getName(): string{
    return this.name
  }

  getType(): string{
    return this.type
  }

  getMeans(): string{
    return this.means
  }

  getIcon(): string{
    return this.icon
  }
  
  getValue(): number{
    return this.value
  }

  getColor(): string{
    return this.color
  }
}
