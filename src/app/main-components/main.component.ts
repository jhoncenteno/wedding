import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, updateDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { AngularFireModule } from '@angular/fire/compat';


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

  targetDate = new Date('2024-12-31T23:59:59'); // Reemplaza con tu fecha objetivo
  public days: number = 0;
  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;

  constructor(
    // @Inject(AngularFirestore) private afs: AngularFirestore,
    private firestore: Firestore,

  ) { }

  ngOnInit() {
    console.log(" AQUIIIIII")
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

  nombreUsuario = ""
  asistencia: boolean | string = false
  formCompleted = false

  async submit() {
    console.log("this.nombreUsuario", this.nombreUsuario)
    console.log("this.asistencia", this.asistencia)

    let usuario = {
      id: "",
      name: this.nombreUsuario,
      asistencia: this.asistencia == "true" ? true : false,
      fecha: new Date()
    }

    if (this.nombreUsuario) {
      const testCol = collection(this.firestore, "usuarios");
      const docRef = await addDoc(testCol, usuario);
      usuario.id = docRef.id;
      await updateDoc(docRef, usuario);
      this.formCompleted = true
      console.log("Usuario añadido")
    }

  }

}
