import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Firestore, addDoc, collection, updateDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogImageComponent } from '../dialogs/dialog-image/dialog-image.component';
interface Guest {
  index: number;
  nombre: string;
  apellido: string; // Agregamos la propiedad apellido
}


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule,
  ],
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // imagePath: string = 'assets/images/imagen-prueba2.jpg';
  imagePath: string = 'assets/images/fondo-leidyH.jpg';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 768) {
      this.imagePath = 'assets/images/fondo-leidyV.jpg';
    } else {
      this.imagePath = 'assets/images/fondo-leidyH.jpg';
    }
  }

  targetDate = new Date('2024-12-31T23:59:59'); // Reemplaza con tu fecha objetivo
  public days: number = 0;
  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;

  constructor(
    private firestore: Firestore,
    private dialog: MatDialog,
    private renderer: Renderer2

  ) { }

  ngOnInit() {
    // console.log(" AQUIIIIII")
    this.initCountdown();
    // setInterval(() => {
    //   console.log("Dentro de interval")
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

  openImageModal() {
    const dialogRef = this.dialog.open(DialogImageComponent, {
      width: '500px',
      data: {}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) this.showButton = true
    //   else {
    //     this.router.navigate(['']);
    //   }
    // });
  }

  nombreUsuario = ""
  apellidoUsuario: string = "";
  asistencia: boolean | string = false

  formCompleted = false

  guests: Guest[] = []; // Arreglo para almacenar los invitados
  guestIndex: number = 0; // Índice para asignar identificadores únicos a los invitados

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
  
    if (this.nombreUsuario) {
      // console.log("usuario", usuario)

      this.formCompleted = true;
      const col = collection(this.firestore, "usuarios");
      const docRef = await addDoc(col, usuario);
      usuario.id = docRef.id;
      await updateDoc(docRef, usuario);
      console.log("Usuario añadido");
    }
  }

  isGuestFormValid(): boolean {
    // Verifica si todos los invitados tienen el nombre y el apellido llenos
    return this.guests.every(guest => guest.nombre && guest.apellido);
  }

}
