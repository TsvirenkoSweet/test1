import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  aSub!: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

    this.route.queryParams.subscribe((params) => {
      // if (params['registered']) {
      //
      // } else if (params['accessDenied']) {
      //
      // }
    });
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.form.disable();
      this.aSub = this.auth.singIn(this.form.value).subscribe(
        () => this.router.navigate(['/']),
        error => {
          console.warn(error);
          this.form.enable();
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
