import {NgModule, Provider} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/token.interceptor";
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FileComponent } from './file/file.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "./header/header.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {MainLayoutComponent} from "./shared/layouts/main-layout/main-layout.component";

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    FileComponent,
    HeaderComponent,
    NotFoundComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
