import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AppComponent} from "./app.component";
import {MainLayoutComponent} from "./shared/layouts/main-layout/main-layout.component";
import {AuthGuard} from "./shared/clases/auth.guard";
import {NotFoundComponent} from "./not-found/not-found.component";
import {FileComponent} from "./file/file.component";

const routes: Routes = [
  { path: '', component: AuthLayoutComponent, children: [
      { path: 'file', canActivate: [AuthGuard], component: FileComponent },
    ]
  },
  { path: '', component: MainLayoutComponent, children: [
      { path: '', component: AppComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
