import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Map, Overlay } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { MapComponent } from '../../map/map.component';

@Component({
  selector: 'app-marker-distretto',
  templateUrl: './marker-distretto.component.html',
  styleUrls: ['./marker-distretto.component.css']
})
export class MarkerDistrettoComponent implements OnInit {

  ngOnInit(): void {
    this.clickOnMarker();
  }

  //Proprietà

  showDiv: boolean = true;
  showMenu: boolean = false;
  figlioString: string = 'string figlio';
  
  //@Output() dati dal figlio (marker) al padre (mappa)
 
  @Output() markerChildNotify: EventEmitter<boolean> = new EventEmitter<boolean>()


  
  //Metodi

  clickFenUrb(): void{
    this.showDiv = !this.showDiv;
    console.log('showDiv = ' + this.showDiv);
  }


  clickOnMarker(){
    //create Overlay
    let overlayContainerElement = document.querySelector('.overlay-container')
    let overlayLayer = new Overlay({
        element: overlayContainerElement,
      })
      MapComponent.mappa!.addOverlay(overlayLayer);

    //click on Map
    MapComponent.mappa!.on('click', (e) =>{
      console.log("click map");
      overlayLayer.setPosition(undefined);
      this.showMenu = false;
      this.markerChildNotify.emit(this.showMenu);
    
      MapComponent.mappa!.forEachFeatureAtPixel(e.pixel, (feature: any, layer: any) =>{
        console.log("click point");
        let clickedCoordinate = e.coordinate;
        overlayLayer.setPosition(clickedCoordinate);

        MapComponent.mappa!.getView().setCenter(e.coordinate);
        MapComponent.mappa!.getView().setZoom(7);
        this.showMenu = true;
        console.log('Marker - showMenu: ' + this.showMenu);
        this.markerChildNotify.emit(this.showMenu);
      },
      )}
    )

  }

}
