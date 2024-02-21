import { Component, OnInit } from '@angular/core';
import { DialogSecurityComponent } from '../dialogs/dialog-security/dialog-security.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-download-report',
  standalone: true,
  imports: [],
  templateUrl: './download-report.component.html',
  styleUrl: './download-report.component.css'
})
export class DownloadReportComponent implements OnInit {

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.openConfirmationModal();
  }

  openConfirmationModal() {
    const dialogRef = this.dialog.open(DialogSecurityComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
