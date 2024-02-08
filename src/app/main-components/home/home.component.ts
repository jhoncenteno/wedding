import { Component } from '@angular/core';
import moment, { Duration, Moment } from 'moment';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  fechaEspecifica: string = '2024-12-31'; // Fecha específica para la que deseas calcular el contador
  fechaEspecificaMoment: Moment = moment(this.fechaEspecifica)
  fechaActual: any
  diasRestantes: number = 0;
  horasRestantes: number = 0;
  minutosRestantes: number = 0;
  segundosRestantes: number = 0;

  constructor() { }

  ngOnInit(): void {
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
