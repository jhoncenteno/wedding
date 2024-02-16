import { Component, OnInit } from '@angular/core';
// import { Loader } from '@googlemaps/js-api-loader';

import moment, { Duration, Moment } from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  fechaEspecifica: string = '2024-12-31'; // Fecha específica para la que deseas calcular el contador
  fechaEspecificaMoment: Moment = moment(this.fechaEspecifica)
  fechaActual: any
  diasRestantes: number = 0;
  horasRestantes: number = 0;
  minutosRestantes: number = 0;
  segundosRestantes: number = 0;



  constructor() { }

  ngOnInit(): void {
    // ------------------
    // let map: google.maps.Map;

    // const center = { lat: 41.90476224706472, lng: 12.49822074385094 };
    // const zoom = 14;
    // const url = "https://maps.googleapis.com/maps/api/staticmap";
    
    // // @ts-ignore google.maps.plugins
    // const loader = new Loader({
    //   apiKey: "AIzaSyDUbmmjq-GQq7GwEMW609SUV2XnNBGIK28",
    //   version: "weekly",
    // });
    
    // document.addEventListener("DOMContentLoaded", () => {
    //   const wrapper = document.getElementById("wrapper") as HTMLButtonElement;
    
    //   wrapper.style.backgroundImage = `url(${url}?center=${center.lat},${center.lng}&zoom=${zoom}&scale=2&size=${wrapper.clientWidth}x${wrapper.clientHeight}&key=YOUR_API_KEY)`;
    
    //   wrapper.addEventListener("click", () => {
    //     wrapper.remove();
    
    //     loader.load().then(() => {
    //       map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    //         center,
    //         zoom,
    //       });
    //     });
    //   });
    // });
    // ------------------

    // console.log("Aquiiiiiii")
    this.actualizarContador(); // Llama a la función para que el contador se actualice inmediatamente
    // setInterval(() => {
    //   console.log("Acaaa")
    //   this.actualizarContador(); // Llama a la función cada segundo para mantener actualizado el contador
    // }, 1000);
  }

  actualizarContador(): void {    
    this.fechaActual = moment();
    const diferencia = moment.duration(this.fechaEspecificaMoment.diff(this.fechaActual));

    this.diasRestantes = diferencia.days();
    this.horasRestantes = diferencia.hours();
    this.minutosRestantes = diferencia.minutes();
    this.segundosRestantes = diferencia.seconds();
  }
}
