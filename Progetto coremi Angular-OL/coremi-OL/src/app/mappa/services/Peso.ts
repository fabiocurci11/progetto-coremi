export class Peso {

    coesioneSpaziale: number;
    qualitaDelloSpazio: number;
    orientamentoPedonale: number;
    buonaVegetazione: number;
    orientamentoCiclabile: number;

    constructor(coesSpaz: number, qualSpaz: number, orPed: number, buonVeg: number, orCicl: number){
        this.coesioneSpaziale = coesSpaz;
        this.qualitaDelloSpazio = qualSpaz;
        this.orientamentoPedonale = orPed;
        this.buonaVegetazione = buonVeg;
        this.orientamentoCiclabile = orCicl;
    }

}