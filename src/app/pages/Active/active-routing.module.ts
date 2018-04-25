import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PickupComponent } from './pickup/pickup.component';
import { AtCentreComponent } from './at-centre/at-centre.component';
import { DropOffComponent } from './drop-off/drop-off.component';
import { RsaComponent } from './rsa/rsa.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { ActiveComponent } from './active.component';

const routes: Routes = [{
  path: '',
  component: ActiveComponent,
  children: [
  {
    path: 'pickup',
    component: PickupComponent,
  }, 
  {
    path: 'at-centre',
    component: AtCentreComponent,
  },{
    path: 'drop-off',
    component: DropOffComponent,
  },
  {
    path: 'rsa',
    component: RsaComponent,
  },
  {
    path: 'chauffeur',
    component: ChauffeurComponent,
  }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActiveRoutingModule { 
  
}
export const routedComponents = [
  PickupComponent,
  ActiveComponent
]
