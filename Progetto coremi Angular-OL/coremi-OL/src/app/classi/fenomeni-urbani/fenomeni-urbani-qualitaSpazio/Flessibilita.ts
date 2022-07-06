import { ColorMapping } from "src/services/ColorMapping";
import { Corema } from "../../coremi/coremi";

export class Flessibilita implements Corema{
    name: string;
    type?: string ;
    means: string;
    icon?: string;
    
    value: number
    color?: string;
    

    constructor(value: number){
        this.name = 'Flessibilita';
        this.type = 'spazialeOP';
        this.means = 'il significato è';
        this.icon = 'flessibilita.png'
    
        this.value = value;
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

}