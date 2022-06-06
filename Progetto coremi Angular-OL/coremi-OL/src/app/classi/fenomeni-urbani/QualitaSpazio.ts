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
    value: number;
    color?: string;

    varieta: Varieta;
    penFis: PenetrabilitaFisica;
    identLuogo: IdentitaLuogo;
    fless: Flessibilita;
    legg: Leggibilita;


    constructor(value: number, varieta: Varieta, penFis: PenetrabilitaFisica, identLuogo: IdentitaLuogo, fless: Flessibilita, legg: Leggibilita){
        this.name = 'Qualita dello spazio';
        this.type = 'spaziale';
        this.means = 'il significato è';
    
        this.value = value;

        this.varieta = varieta
        this.penFis = penFis
        this.identLuogo = identLuogo;
        this.fless = fless;
        this.legg = legg
    }

    
    calculateUHIQualSpaz(): void{
        let varietaVal = this.varieta.value;
        let penFisVal = this.penFis.value;
        let identLuogoVal = this.identLuogo.value;
        let flessVal = this.fless.value;
        let leggVal = this.legg.value;

        this.value = varietaVal * 1 + penFisVal * 1 + identLuogoVal * 1 + flessVal * 1 + leggVal * 1;
        //console.log('this.valueQualSpaz: ' + this.value);
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