import { Component } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-travel-and-lodging',
  standalone: true,
  imports: [],
  templateUrl: './travel-and-lodging.component.html',
  styleUrl: './travel-and-lodging.component.css'
})
export class TravelAndLodgingComponent {

  ngOnInit() {
    const apiKey = environment.googlemaps.apiKey
    this.initializeMap(apiKey);
  }

  initializeMap(apiKey: string) {
    const loader = new Loader({
      apiKey,
      version: "weekly",
      // ...additionalOptions,
    });
    
    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      let map = new Map(document.getElementById("map") as HTMLElement, {
        center: { 
          lat: 52.754634329023425, lng:13.229502449373918
         },
        zoom: 16,
      });
    });
  }

}
