import { Component } from '@angular/core';
import { Firestore, collection, getDocs, orderBy, query } from '@angular/fire/firestore';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

  constructor(
    private firestore: Firestore,
  ) { }

  async download() {
    const workbook = XLSX.utils.book_new();
    const worksheet = await this.generateWorksheet();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
    XLSX.writeFile(workbook, 'usuarios.xlsx');
  }

  async generateWorksheet(): Promise<XLSX.WorkSheet> {
    const usersData = await this.getDocuments();
    const headers = [
      // 'ID', 
      'Nombre', 
      'Asistencia', 
      // 'Fecha'
    ];

    const data: any[][] = [headers];

    usersData.forEach(user => {
      const userData = [
        // user.id,
        user.name,
        user.asistencia ? 'Sí' : 'No',
        // user.fecha ? user.fecha.toDate().toLocaleString() : ''
      ];
      data.push(userData);
    });

    return XLSX.utils.aoa_to_sheet(data);
  }

  async getDocuments(): Promise<any[]> {
    const testCol = collection(this.firestore, "usuarios");
    
    const q = query(testCol, orderBy('fecha', 'asc'));

    try {
      const querySnapshot = await getDocs(q);
      const usersData: any[] = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        usersData.push(userData);
      });
      return usersData;
    } catch (error) {
      console.error("Error al obtener documentos:", error);
      return [];
    }
  }
}
