import { Routes } from '@angular/router';
import { MainComponent } from './main-components/main.component';
import { GalleryComponent } from './main-components/gallery/gallery.component';
import { TravelAndLodgingComponent } from './main-components/travel-and-lodging/travel-and-lodging.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'gallery',
        component: GalleryComponent
    },
    {
        path: 't&l',
        component: TravelAndLodgingComponent,
    },
];
