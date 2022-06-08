import { Corema } from "../coremi/coremi";
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
    value!: number;
    color?: string;

    caffeRistoranti!: CaffeRistoranti;
    panchine!: Panchine;
    opereDarte!: OpereDarte;
    fontane!: Fontane;
    illuminazione!: Illuminazione;
    accessoWC!: AccessoWC;


    constructor(value?: number, cafRist?: CaffeRistoranti, panchine?: Panchine, opereDarte?: OpereDarte, fontane?: Fontane, illuminazione?: Illuminazione, accessoWC?: AccessoWC){
        this.name = 'Elemanenti Ambientali';
        this.type = 'spaziale';
        this.means = 'il significato è';
        this.icon = 'elementiAmbientali.png'
    
        if(value) this.value = value;

        if(cafRist) this.caffeRistoranti = cafRist
        if(panchine) this.panchine = panchine
        if(opereDarte) this.opereDarte = opereDarte;
        if(fontane) this.fontane = fontane;
        if(illuminazione) this.illuminazione = illuminazione;
        if(accessoWC) this.accessoWC = accessoWC;
    }

    
    
    calculateUHIElemAmb(): void{
        let cafRistVal = this.caffeRistoranti.value;
        let panchineVal = this.panchine.value;
        let opereDarteVal = this.opereDarte.value;
        let fontaneVal = this.fontane.value;
        let illuminazioneVal = this.illuminazione.value;
        let accessoWCVal = this.accessoWC.value;

        let w = 1/6

        this.value = cafRistVal * w + panchineVal * w + opereDarteVal * w + fontaneVal * w + illuminazioneVal * w + accessoWCVal * w;
        //console.log('this.valueElAmb: ' + this.value);
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