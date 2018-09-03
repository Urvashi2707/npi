import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBookingComponent  } from './addbooking.component';
import { ServicingComponent } from './servicing/servicing.component';
import { RsaComponent } from './rsa/rsa.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { GmapsComponent } from '../maps/gmaps/gmaps.component';

const routes: Routes = [{
  path: '',
  component: AddBookingComponent,
  children: [
  {
    path: 'Servicing',
    component: ServicingComponent,
  }, {
    path: 'Chauffeur',
    component: ChauffeurComponent,
  },{
    path: 'RSA',
    component: RsaComponent,
  }
  ,{
    path: 'map',
    component: GmapsComponent,
  }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AddbookingRoutingModule { }
export const routedComponents = [
  AddBookingComponent,
  ServicingComponent,
  ChauffeurComponent,
  RsaComponent
];
