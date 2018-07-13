import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from 'app/portfolio/portfolio.component';
import { AuthenticationGuardService } from '@security/authentication-guard.service';

const routes: Routes = [
  
  {
  	path: 'portfolio',
  	component: PortfolioComponent,
  	canActivate: [AuthenticationGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
