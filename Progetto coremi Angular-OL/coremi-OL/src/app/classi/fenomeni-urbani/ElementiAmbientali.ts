import { ColorMapping } from "src/services/ColorMapping";
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

    weigth!: number | undefined


    constructor(value?: number, peso2?: number, cafRist?: CaffeRistoranti, panchine?: Panchine, opereDarte?: OpereDarte, fontane?: Fontane, illuminazione?: Illuminazione, accessoWC?: AccessoWC){
        //alert('constructor')
        this.name = 'Elemanenti Ambientali';
        this.type = 'spaziale';
        this.means = 'il significato è';
        this.icon = 'elementiAmbientali.png'
    
        if(value) {
           // alert('value in el amb: '+ this.value +' = ' + value)
            this.value = value;
        }

        if(cafRist) this.caffeRistoranti = cafRist
        if(panchine) this.panchine = panchine
        if(opereDarte) this.opereDarte = opereDarte;
        if(fontane) this.fontane = fontane;
        if(illuminazione) this.illuminazione = illuminazione;
        if(accessoWC) this.accessoWC = accessoWC;

        this.weigth = peso2
    }

    
    
    calculateUHIElemAmb() {
        let cafRistVal = this.caffeRistoranti.value;
        let panchineVal = this.panchine.value;
        let opereDarteVal = this.opereDarte.value;
        let fontaneVal = this.fontane.value;
        let illuminazioneVal = this.illuminazione.value;
        let accessoWCVal = this.accessoWC.value;

        let w1 = 1
        let w2 = 1
        let w3 = 1
        let w4 = 1
        let w5 = 1
        let w6 = 1
        
        //Uso il metodo floor per arrotondare un numero con la virgola
        let uhiFloor = (cafRistVal * w1! + panchineVal * w2! + opereDarteVal * w3! + fontaneVal * w4! + illuminazioneVal * w5! + accessoWCVal * w6!)/6;
        console.log('UHI elAmb ' + uhiFloor);
        uhiFloor = Math.floor(uhiFloor);
        return uhiFloor;
    }
    
    calculateColor(value: number): void {
       // console.log('valueColorEl: '+ value)
        this.color = ColorMapping.mapValueToColor(value);
       // console.log('color: '+this.color)
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

    getWeigth(): number| undefined {
        return this.weigth;
    }


}