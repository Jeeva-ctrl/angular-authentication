import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../login';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {Authenticationservice } from '../services';
// used to create fake backend
import { fakeBackendProvider } from '../_helpers';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, LoginComponent],
  bootstrap: [AppComponent],
  providers: [fakeBackendProvider],
})
export class AppModule {}
