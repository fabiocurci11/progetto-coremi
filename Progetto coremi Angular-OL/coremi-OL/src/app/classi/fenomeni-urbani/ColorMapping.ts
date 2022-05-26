import Icon from "ol/style/Icon";

export class ColorMapping {

    //static srcIcon: string = ''

    static iconMarkerStyleMarrone = new Icon({
        src: 'assets/home2.png', 
        size: [100, 100],
        offset: [0,0],
        opacity: 1,
        scale: 0.5
      })

    //Icon Marker Style 
    static iconMarkerStyleRosso = new Icon({
        src: 'assets/home2.png', 
        size: [100, 100],
        offset: [0,0],
        opacity: 1,
        scale: 0.5
      })
  
    static iconMarkerStyleArancione = new Icon({
        src: 'assets/home2.png', 
        size: [100, 100],
        offset: [0,0],
        opacity: 1,
        scale: 0.5
      })

      static iconMarkerStyleGiallo = new Icon({
        src: 'assets/home.png', 
        size: [100, 100],
        offset: [0,0],
        opacity: 1,
        scale: 0.5
      })

      static iconMarkerStyleVerde = new Icon({
        src: 'assets/home.png', 
        size: [100, 100],
        offset: [0,0],
        opacity: 1,
        scale: 0.5
      })

      static iconMarkerStyleVoid = new Icon({
        src: 'assets/home.png', 
        size: [100, 100],
        offset: [0,0],
        opacity: 1,
        scale: 0.5
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
        console.log('colormapping: ' + this.valueColorDict.get(value)! );
        return this.valueColorDict.get(value)!;
    }

    //static setFenUrbColor(){}

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