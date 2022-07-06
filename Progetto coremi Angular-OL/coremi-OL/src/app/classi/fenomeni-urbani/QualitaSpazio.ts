import { Corema } from "../coremi/coremi";
import { ColorMapping } from "../../../services/ColorMapping";
import { Flessibilita } from "./fenomeni-urbani-qualitaSpazio/Flessibilita";
import { IdentitaLuogo } from "./fenomeni-urbani-qualitaSpazio/IdentitaLuogo";
import { Leggibilita } from "./fenomeni-urbani-qualitaSpazio/Leggibilita";
import { PenetrabilitaFisica } from "./fenomeni-urbani-qualitaSpazio/PenetrabilitaFisica";
import { Varieta } from "./fenomeni-urbani-qualitaSpazio/Varieta";

export class QualitaSpazio implements Corema{
    name: string;
    type?: string;
    means: string;
    icon?: string;
    value!: number;
    color?: string;

    varieta!: Varieta;
    penFis!: PenetrabilitaFisica;
    identLuogo!: IdentitaLuogo;
    fless!: Flessibilita;
    legg!: Leggibilita;

    weigth!: number | undefined

    constructor(value?: number, peso5?: number, varieta?: Varieta, penFis?: PenetrabilitaFisica, identLuogo?: IdentitaLuogo, fless?: Flessibilita, legg?: Leggibilita){
        //alert('constructor qs')
        this.name = 'Qualita dello spazio';
        this.type = 'spaziale';
        this.means = 'il significato è';
        this.icon = 'qualitaDelloSpazio.png'
    
        if(value) {
            //alert('value in qual spaz: '+ this.value +' = ' + value)
            this.value = value;
        }

        if(varieta) this.varieta = varieta
        if(penFis) this.penFis = penFis
        if(identLuogo) this.identLuogo = identLuogo;
        if(fless) this.fless = fless;
        if(legg) this.legg = legg

        this.weigth = peso5;
    }

    
    calculateUHIQualSpaz() {
        let varietaVal = this.varieta.value;
        let penFisVal = this.penFis.value;
        let identLuogoVal = this.identLuogo.value;
        let flessVal = this.fless.value;
        let leggVal = this.legg.value;

        let w1 = 1
        let w2 = 1
        let w3 = 1
        let w4 = 1
        let w5 = 1
        let w6 = 1
        
        //Uso il metodo floor per arrotondare un numero con la virgola
        let uhiFloor = (varietaVal * w1! + penFisVal * w2! + identLuogoVal * w3! + flessVal * w4! + leggVal * w5!)/5;
        console.log('UHI qualSpaz ' + uhiFloor);
        uhiFloor = Math.floor(uhiFloor);
        return uhiFloor;
    }

    calculateColor(value: number): void {
        console.log('valueColorQS: '+ value)
         this.color = ColorMapping.mapValueToColor(value);
         console.log('color: '+this.color)
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

    getWeigth(): number | undefined {
        return this.weigth;
    }

    
}