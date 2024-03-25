import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-dialog-intro',
  standalone: true,
  imports: [],
  templateUrl: './dialog-intro.component.html',
  styleUrl: './dialog-intro.component.css',
  animations: [
    trigger('dialogAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.7)' }),
        animate('1000ms', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('1000ms', style({ opacity: 0, transform: 'scale(0.7)' })),
      ]),
    ]),
  ],
})
export class DialogIntroComponent {

}
