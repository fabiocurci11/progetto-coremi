import { AreaUrbana } from "./areaUrbana";
import { Corema } from "../coremi/coremi";
import { ColorMapping } from "../../../services/ColorMapping";


export class Distretto implements Corema{

    name: string;
    type?: string;
    means: string;
    icon?: string;

    value?: number;
    color?: string;
    id:string | number | undefined

    urbanArea: AreaUrbana;

    constructor(id: string | number | undefined, nome: string, areaUrbana: AreaUrbana, /*pesi: Peso,*/ tipo?: string, icona?: string){
        this.id = id;
        this.name = nome;
        this.type = tipo;
        this.means = 'significato';
        this.icon = icona;

        this.urbanArea = areaUrbana;
    }


    calculateUHI(){
        let orPed = this.urbanArea.orientamentoPedonale.value
        let elAmb = this.urbanArea.elementiAmbientali.value
        let coesSpaz = this.urbanArea.coesioneSpaziale.value
        let orCicl = this.urbanArea.orientamentoCiclabile.value
        let qualSpaz = this.urbanArea.qualitaDelloSpazio.value
        let buonaVeg = this.urbanArea.buonaVegetazione.value
        
        //Uso il metodo floor per arrotondare un numero con la virgola
        let uhiFloor = (orPed * 1 + elAmb * 1 + coesSpaz * 1 + orCicl * 1 + qualSpaz * 1 + buonaVeg *1)/6;
        uhiFloor = Math.floor(uhiFloor);
        return uhiFloor
    }


    calculateColor(value: number): void {
        this.color = ColorMapping.mapValueToColor(value);
    }
  

    getColore(): string {
        return this.color!
    }

    getNome(): string {
        return this.name
    }

    getId(): string | number | undefined{
        return this.id
    }
    

}