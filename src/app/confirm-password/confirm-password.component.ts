import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { SharedService } from '../service/shared.service';

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
    private _formBuilder: FormBuilder,
    private _crud: CrudService,
    private _shared: SharedService,
  ) {
    this.email = localStorage.getItem('veryEmail');
    this.email_id = JSON.parse(this.email)
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
    if (!this.email_id) {
      this._shared.tostErrorTop('Invalid email');
      return;
    }

    if (this.forget_pass_form.valid) {
      const newPassword = this.forget_pass_form.value.newPassword;
      this._crud.forget_password(this.email_id, newPassword).subscribe(
        (response) => {
          console.log(response);
          this._shared.tostSuccessTop('Success');
          localStorage.removeItem('veryEmail');
          this._router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
          this._shared.tostErrorTop('Password not changed');
        }
      );
    } else {
      this._shared.tostErrorTop('Please fill all fields');
    }
  }
}