import { Component, OnInit } from '@angular/core';
// import { Loader } from '@googlemaps/js-api-loader';

import { Observable, Subject, interval } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import moment, { Duration, Moment } from 'moment';
import * as dotenv from 'dotenv';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  // ngOnInit(): void {
  //   dotenv.config(); // Lee el archivo .env
  //   let apiKey = ""
  //   if (process.env["GOOGLE_MAPS_API_KEY"]) {
  //     apiKey = process.env["GOOGLE_MAPS_API_KEY"];
  //   } else {
  //     console.error("API key not found in .env");
  //   }

  //   // ------------------
  //   let map: google.maps.Map;

  //   const center = { lat: 41.90476224706472, lng: 12.49822074385094 };
  //   const zoom = 14;
  //   const url = "https://maps.googleapis.com/maps/api/staticmap";
    
  //   // @ts-ignore google.maps.plugins
  //   const loader = new Loader({
  //     apiKey,
  //     version: "weekly",
  //   });
    
  //   document.addEventListener("DOMContentLoaded", () => {
  //     const wrapper = document.getElementById("wrapper") as HTMLButtonElement;
    
  //     wrapper.style.backgroundImage = `url(${url}?center=${center.lat},${center.lng}&zoom=${zoom}&scale=2&size=${wrapper.clientWidth}x${wrapper.clientHeight}&key=YOUR_API_KEY)`;
    
  //     wrapper.addEventListener("click", () => {
  //       wrapper.remove();
    
  //       loader.load().then(() => {
  //         map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
  //           center,
  //           zoom,
  //         });
  //       });
  //     });
  //   });
  //   // ------------------

  // }

  // -----------------------------
  targetDate = new Date('2024-12-31T23:59:59'); // Reemplaza con tu fecha objetivo
  public days: number = 0;
  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;

  constructor() { }

  ngOnInit() {
    console.log(" AQUIIIIII")
    this.initCountdown();
    // setInterval(() => {
    //   this.initCountdown();
    // }, 1000);
  }

  initCountdown() {
    this.days = this.calculateRemainingTime().days;
    this.hours = this.calculateRemainingTime().hours;
    this.minutes = this.calculateRemainingTime().minutes;
    this.seconds = this.calculateRemainingTime().seconds;
  }

  calculateRemainingTime(): { days: number, hours: number, minutes: number, seconds: number } {
    const now = new Date();
    const diff = this.targetDate.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

}
