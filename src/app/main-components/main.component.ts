import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Firestore, addDoc, collection, updateDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogImageComponent } from '../dialogs/dialog-image/dialog-image.component';
import * as dateFns from 'date-fns';
import { DialogIntroComponent } from '../dialogs/dialog-intro/dialog-intro.component';

interface Guest {
  index: number;
  nombre: string;
  apellido: string; 
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule,
    MatSnackBarModule,
  ],
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private firestore: Firestore,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  // -------- Header Count down

  // targetDate = new Date('2024-03-03T00:00:01');
  // fechaObjetivo: Date = new Date('2024-10-16T13:00:00');
  fechaObjetivo: Date = new Date('2024-08-30T13:30:00');
  meses: number = 0;
  dias: number = 0;
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;

  ngOnInit(): void {
    this.calcularDiferenciaTiempo();
    // interval(1000).subscribe(() => {
    //   this.calcularDiferenciaTiempo();
    // });
    // this.showAlertPopup();
    // this.openIntroModal()

  }

  showAlertPopup() {
    this.openSnackBar('The website may not display all features correctly on iOS devices. To be able to use all the functionalities, please access it using a pc with Windows/Linux or an Android device.');
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      verticalPosition: 'top', // Positioning the snackbar at the top
      panelClass: ['snackbar-1'], // Apply custom CSS class to the snackbar
    });
  }

  openIntroModal() {
    this.dialog.open(DialogIntroComponent, {
      width: '80vw',
      data: {}
    });
  }

  calcularDiferenciaTiempo(): void {
    const diferenciaEnMeses = dateFns.differenceInMonths(this.fechaObjetivo, new Date());
    const fechaRestanteMeses = dateFns.addMonths(new Date(), diferenciaEnMeses);
    const diferenciaEnDias = dateFns.differenceInDays(this.fechaObjetivo, fechaRestanteMeses);
    const fechaRestanteDias = dateFns.addDays(fechaRestanteMeses, diferenciaEnDias);
    const diferenciaEnHoras = dateFns.differenceInHours(this.fechaObjetivo, fechaRestanteDias);
    const fechaRestanteHoras = dateFns.addHours(fechaRestanteDias, diferenciaEnHoras);
    const diferenciaEnMinutos = dateFns.differenceInMinutes(this.fechaObjetivo, fechaRestanteHoras);
    const fechaRestanteMinutos = dateFns.addMinutes(fechaRestanteHoras, diferenciaEnMinutos);
    const diferenciaEnSegundos = dateFns.differenceInSeconds(this.fechaObjetivo, fechaRestanteMinutos);

    this.meses = diferenciaEnMeses;
    this.dias = diferenciaEnDias;
    this.horas = diferenciaEnHoras;
    this.minutos = diferenciaEnMinutos;
    this.segundos = diferenciaEnSegundos;

    this.meses = Math.abs(diferenciaEnMeses);
    this.dias = Math.abs(diferenciaEnDias);
    this.horas = Math.abs(diferenciaEnHoras);
    this.minutos = Math.abs(diferenciaEnMinutos);
    this.segundos = Math.abs(diferenciaEnSegundos);
  }

  // --------

  openImageModal() {
    const dialogRef = this.dialog.open(DialogImageComponent, {
      height: "85vh",
      maxWidth: '90vw',
      minWidth: '80vw',
      data: {}
    });
  }

  // -------- Attending Section
  nombreUsuario = ""
  apellidoUsuario: string = "";
  asistencia: boolean | string = false
  guests: Guest[] = []; // Arreglo para almacenar los invitados
  guestIndex: number = 0; // Índice para asignar identificadores únicos a los invitados
  formCompleted = false
  showAlert = false

  addGuest() {
    this.guestIndex++;
    this.guests.push({ index: this.guestIndex, nombre: '', apellido: '' });
  }  

  removeGuest(index: number) {
    this.guests.splice(index, 1);
  }

  async submit() {
    let usuario = {
      id: "",
      name: this.nombreUsuario,
      apellido: this.apellidoUsuario,
      asistencia: this.asistencia == "true" ? true : false,
      fecha: new Date(),
      numeroInvitados: this.guests.length,
      invitados: this.guests.map(guest => ({ nombre: guest.nombre, apellido: guest.apellido }))
    };
  

    this.formCompleted = true;
    const colTest = collection(this.firestore, "test");
    const docRefTest = await addDoc(colTest, usuario);
    usuario.id = docRefTest.id;
    await updateDoc(docRefTest, usuario);

    const col = collection(this.firestore, "usuarios");
    const docRef = await addDoc(col, usuario);
    usuario.id = docRef.id;
    await updateDoc(docRef, usuario);
    console.log("Usuario añadido");
  }

  isGuestFormValid(): boolean {
    // Verifica si todos los invitados tienen el nombre y el apellido llenos
    return this.guests.every(guest => guest.nombre && guest.apellido);
  }

}
