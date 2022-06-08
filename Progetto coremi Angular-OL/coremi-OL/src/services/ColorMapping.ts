import Icon from "ol/style/Icon";

export class ColorMapping {

    //static srcIcon: string = ''

    //Icone per i distretti (devono essere di 5 colori, ognuno per ogni tipo di criticità)
    static iconMarkerStyleMarrone = new Icon({
      src: 'assets/distretti_icon/house_brown.png', 
        offset: [0,0],
        opacity: 1,
        scale: 0.1
      })

    //Icon Marker Style 
    static iconMarkerStyleRosso = new Icon({
        src: 'assets/distretti_icon/house_red.png', 
        offset: [0,0],
        opacity: 1,
        scale: 0.1
      })
  
    static iconMarkerStyleArancione = new Icon({
        src: 'assets/distretti_icon/house_orange.png', 
        offset: [0,0],
        opacity: 1,
        scale: 0.1
      })

      static iconMarkerStyleGiallo = new Icon({
        src: 'assets/distretti_icon/house_yellow.png', 
        offset: [0,0],
        opacity: 1,
        scale: 0.1
      })

      static iconMarkerStyleVerde = new Icon({
        src: 'assets/distretti_icon/house_green.png', 
        offset: [0,0],
        opacity: 1,
        scale: 0.1
      })

      static iconMarkerStyleVoid = new Icon({
        src: 'assets/distretti_icon/home_icon.png', 
        offset: [0,0],
        opacity: 1,
        scale: 0.1
      })

    static valueColorDict = new Map([
        [0, 'colorError'],
        [1, 'marrone'],
        [2, 'marrone'],
        [3, 'rosso'],
        [4, 'rosso'],
        [5, 'arancione'],
        [6, 'arancione'],
        [7, 'giallo'],
        [8, 'giallo'],
        [9, 'verde'],
        [10, 'verde'],
    ]);

    static mapValueToColor(value: number): string{
        //console.log('colormapping: ' + this.valueColorDict.get(value)! );
        return this.valueColorDict.get(value)!;
    }

    
    static setFenUrbColor(color: string): string{
      if(color == "marrone") return color = '#87461C';
      if(color == "rosso") return color = 'red';
      if(color == "arancione") return color = 'orange';
      if(color == "giallo") return color = 'yellow';
      if(color == "verde") return color = 'green';

      //colorError
      return color = 'white';
    }

    static setStyleIconFromColor(color: string): Icon{
      
        if(color == "marrone") return this.iconMarkerStyleMarrone;
        if(color == "rosso") return this.iconMarkerStyleRosso;
        if(color == "arancione") return this.iconMarkerStyleArancione;
        if(color == "giallo") return this.iconMarkerStyleGiallo;
        if(color == "verde") return this.iconMarkerStyleVerde;

        if(color == "colorError") return this.iconMarkerStyleVoid;

        return this.iconMarkerStyleVoid;
    }

    
}