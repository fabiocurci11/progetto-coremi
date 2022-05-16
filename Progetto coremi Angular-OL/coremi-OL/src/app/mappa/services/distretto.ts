import { AreaUrbana } from "./areaUrbana";
import { Corema } from "./coremi";
import { Peso } from "./Peso";

export class Distretto implements Corema{

    name: string;
    type?: string;
    means: string;
    icon?: string;

    colore!: string;
    value?: number;
    color?: string;

    urbanArea: AreaUrbana;

    constructor(nome: string, areaUrbana: AreaUrbana, /*pesi: Peso,*/ tipo?: string, icona?: string){
        this.name = nome;
        this.type = tipo;
        this.means = 'significato';
        this.icon = icona;

        this.urbanArea = areaUrbana;
    }


    calculateUHI(){
        let coesSpaz = this.urbanArea.coesioneSpaziale.value
        let qualSpaz = this.urbanArea.qualitaDelloSpazio.value
        let orPed = this.urbanArea.orientamentoPedonale.value
        let buonaVeg = this.urbanArea.buonaVegetazione.value
        let orCicl = this.urbanArea.orientamentoCiclabile.value

        return coesSpaz * 1 + qualSpaz * 1 + orPed * 1 + buonaVeg * 1 + orCicl * 1;

    }

    getColore() {
        return this.colore
    }

}