import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuardService } from '@security/authentication-guard.service';
import {PiaResolve} from 'app/services/pia.resolve.service'; // @TODO: create ProcessingResolve
import {PiaService} from 'app/entry/pia.service';
import { PiasListComponent } from './list.component';

const routes: Routes = [
  {
  	path: 'processing/:id/pias',
  	component: PiasListComponent,
  	canActivate: [AuthenticationGuardService, PiaResolve]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PiaService, PiaResolve]
})
export class PiasListRoutingModule { }
