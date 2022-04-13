import { Component } from '@angular/core';

import 'ol/ol.css';
import { fromLonLat } from 'ol/proj';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coremi-OL';
}
