import { Component, OnInit } from '@angular/core';
import { Map, Overlay } from 'ol';
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
    
      MapComponent.mappa!.forEachFeatureAtPixel(e.pixel, function(feature: any, layer: any){
        console.log("click point");
        let clickedCoordinate = e.coordinate;
        overlayLayer.setPosition(clickedCoordinate);

        MapComponent.mappa!.getView().setCenter(e.coordinate);
        MapComponent.mappa!.getView().setZoom(7);
      },
      )}
    )

  }

}
