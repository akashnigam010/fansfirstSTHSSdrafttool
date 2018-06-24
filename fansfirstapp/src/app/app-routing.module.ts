import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';

export const AppRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  // {path: '**', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'verify', component: VerifyemailComponent}
];

@NgModule({
  exports: [RouterModule],

  imports: [RouterModule.forRoot(AppRoutes)]
})

export class AppRoutingModule { }
