import { Corema } from "../coremi";
import { AccessoWC } from "./fenomeni-urbani-elementiAmbientali/AccessoWC";
import { CaffeRistoranti } from "./fenomeni-urbani-elementiAmbientali/CaffeRistoranti";
import { Fontane } from "./fenomeni-urbani-elementiAmbientali/Fontane";
import { Illuminazione } from "./fenomeni-urbani-elementiAmbientali/Illuminazione";
import { OpereDarte } from "./fenomeni-urbani-elementiAmbientali/OpereDarte";
import { Panchine } from "./fenomeni-urbani-elementiAmbientali/Panchine";

export class ElementiAmbientali implements Corema{
    name: string;
    type?: string;
    means: string;
    icon?: string;
    value: number;
    color?: string;

    cafRist: CaffeRistoranti;
    panchine: Panchine;
    opereDarte: OpereDarte;
    fontane: Fontane;
    illuminazione: Illuminazione;
    accessoWC: AccessoWC;


    constructor(value: number, cafRist: CaffeRistoranti, panchine: Panchine, opereDarte: OpereDarte, fontane: Fontane, illuminazione: Illuminazione, accessoWC: AccessoWC){
        this.name = 'Qualita dello spazio';
        this.type = 'spaziale';
        this.means = 'il significato è';
    
        this.value = value;

        this.cafRist = cafRist
        this.panchine = panchine
        this.opereDarte = opereDarte;
        this.fontane = fontane;
        this.illuminazione = illuminazione;
        this.accessoWC = accessoWC;
    }

    
    calculateUHIElemAmb(): void{
        let cafRistVal = this.cafRist.value;
        let panchineVal = this.panchine.value;
        let opereDarteVal = this.opereDarte.value;
        let fontaneVal = this.fontane.value;
        let illuminazioneVal = this.illuminazione.value;
        let accessoWCVal = this.accessoWC.value;

        let w = 1/6

        this.value = cafRistVal * w + panchineVal * w + opereDarteVal * w + fontaneVal * w + illuminazioneVal * w + accessoWCVal * w;
        console.log('this.valueElAmb: ' + this.value);
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