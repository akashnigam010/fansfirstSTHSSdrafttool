import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VerifyEmailComponent } from './verifyemail/verifyemail.component';
import { DraftComponent } from './draft/draft.component';
import { AppRoutingModule } from './app-routing.module';

// Services
import {EmailService} from './service';
// Providers
import {HttpProvider, WebApiProvider} from './provider';

const services = [EmailService];
const providers = [HttpProvider, WebApiProvider];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VerifyEmailComponent,
    DraftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [...services, ...providers],
  bootstrap: [AppComponent]
})
export class AppModule { }
