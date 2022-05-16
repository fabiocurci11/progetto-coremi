import { Corema } from "./coremi";
import { BuonaVegetazione } from "./fenomeni-urbani/BuonaVegetazione";
import { CoesioneSpaziale } from "./fenomeni-urbani/CoesioneSpaziale";
import { OrientamentoCiclabile } from "./fenomeni-urbani/OrientamentoCiclabile";
import { OrientamentoPedonale } from "./fenomeni-urbani/OrientamentoPedonale";
import { QualitaSpazio } from "./fenomeni-urbani/QualitaSpazio";

export class AreaUrbana implements Corema{

    name: string;
    type?: string;
    means: string;
    icon?: string;
    color?: string;
    value?: number;

    coesioneSpaziale: CoesioneSpaziale;
    qualitaDelloSpazio: QualitaSpazio;
    orientamentoPedonale: OrientamentoPedonale;
    buonaVegetazione: BuonaVegetazione;
    orientamentoCiclabile: OrientamentoPedonale;

    constructor(nome: string, coesSpaz: CoesioneSpaziale, qualSpaz: QualitaSpazio, orPed: OrientamentoPedonale, buonVeg: BuonaVegetazione, orCicl: OrientamentoCiclabile, tipo?: string, icona?: string){
        this.name = nome;
        this.type = tipo;
        this.means = 'significato';
        this.icon = icona;

        this.coesioneSpaziale = coesSpaz;
        this.qualitaDelloSpazio = qualSpaz;
        this.orientamentoPedonale = orPed;
        this.buonaVegetazione = buonVeg;
        this.orientamentoCiclabile = orCicl;
    }
    
}