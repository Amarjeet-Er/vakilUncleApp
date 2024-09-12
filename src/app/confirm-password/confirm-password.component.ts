import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss'],
})
export class ConfirmPasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  userEmail: any;
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.passwordForm = this._formBuilder.group({
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
    console.log(this.passwordForm.value.confirmPassword);
    console.log(this.passwordForm.value.newPassword);
    this._router.navigate(['/login'])
  }
}
