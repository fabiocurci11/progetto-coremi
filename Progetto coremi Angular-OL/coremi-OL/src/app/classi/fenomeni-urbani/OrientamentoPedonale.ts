import { Corema } from "../coremi/coremi";
import { ColorMapping } from "../../../services/ColorMapping";

export class OrientamentoPedonale implements Corema{

    name: string;
    type?: string;
    means: string;
    icon?: string;
 
    value: number
    color?: string;

    weigth!: number | undefined 

    constructor(value: number, peso1?: number){
        this.name = 'Orientamento Pedonale';
        this.type = 'spazialeOP';
        this.means = "Indica il livello di facilità di percorrenza di un'area, tenendo conto di fattori come la forma e la continuità dei marciapiedi o delle aree pedonali, la presenza di attraversamenti di strade congestionate, parcheggi non autorizzati e pendenze difficili";
        this.icon = 'orientamentoPedonale.png'
    
        this.value = value;
        this.weigth = peso1;
    }

    calculateColor(value: number): void {
        let valueFloor =  Math.floor(value);
        this.color = ColorMapping.mapValueToColor(valueFloor);
    }
    
    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }


    getType(): string {
        return this.type!;
    }

    setType(type: string): void {
        this.type = type;
    }


    getMeans(): string {
        return this.means;
    }

    setMeans(means: string): void {
        this.means = means;
    }

    
    getIcon(): string {
        return this.icon!;
    }

    setIcon(icon: string): void {
        this.icon = icon;
    }


    getValue(): number {
        return this.value;
    }

    setValue(value: number): void {
        this.value = value;
    }


    getColor(): string {
        return this.color!;
    }

    setColor(color: string): void {
        this.color = color;
    }

    getWeigth(): number | undefined  {
        return this.weigth;
    }

}