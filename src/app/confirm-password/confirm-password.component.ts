import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss'],
})
export class ConfirmPasswordComponent implements OnInit {
  forget_pass_form!: FormGroup;
  userEmail: any;
  email_id: any;
  email: any;
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {
    this.email=localStorage.getItem('veryEmail');
    this.email_id=JSON.parse(this.email)
  }

  ngOnInit() {
    this.forget_pass_form = this._formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPass = control.get('confirmPassword')?.value;

    return newPassword === confirmPass ? null : { 'passwordMismatch': true };
  }

  async confirmPassword() {
    console.log(this.forget_pass_form.value.confirmPassword);
    console.log(this.forget_pass_form.value.newPassword);
    this._router.navigate(['/login'])
  }
}
