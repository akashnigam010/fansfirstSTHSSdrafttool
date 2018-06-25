import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VerifyEmailComponent } from './verifyemail/verifyemail.component';

export const AppRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'verify', component: VerifyEmailComponent}
];

@NgModule({
  exports: [RouterModule],

  imports: [RouterModule.forRoot(AppRoutes)]
})

export class AppRoutingModule { }
