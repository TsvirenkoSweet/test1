import { Component } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { Subscription } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  signupForm!: FormGroup;
  aSub!: Subscription;
  passwordMismatch!: boolean

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        // this.passwordMatchValidator('password')
      ])
    }, { validators: [this.passwordMatchValidator()] });
  }

  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }

  onSubmit(): void {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.valid) {
      this.signupForm.disable();
      this.aSub = this.authService.singUp(this.signupForm.value).subscribe(
        () => this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        }),
        error => {
          console.warn(error);
          this.signupForm.enable();
        }
      );
    }
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl | FormGroup): { [key: string]: any } | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      if(password && confirmPassword && password.value !== confirmPassword.value) {
        this.passwordMismatch = false;
        return { 'passwordMismatch': true }
      } else {
        this.passwordMismatch = true;
        return null
      }
    }
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
