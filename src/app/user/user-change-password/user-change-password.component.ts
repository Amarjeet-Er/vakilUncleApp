import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss'],
})
export class UserChangePasswordComponent implements OnInit {

  passwordForm!: FormGroup;
  showNewPassword = false;
  showCnfPassword = false;
  login: any;
  login_data: any;

  constructor(
    private _fb: FormBuilder,
    private _crud: CrudService,
    private _router: Router,
    private _shared: SharedService,
  ) {
    this.login = localStorage.getItem('userLoginData');
    this.login_data = JSON.parse(this.login)
  }

  ngOnInit(): void {
    this.passwordForm = this._fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      cnfPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('cnfPassword')?.value
      ? null : { 'mismatch': true };
  }

  togglePasswordVisibility(field: string) {
    if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirm') {
      this.showCnfPassword = !this.showCnfPassword;
    }
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const formdata = new FormData();
      formdata.append('oldPassword', this.passwordForm.get('oldPassword')?.value);
      formdata.append('newPassword', this.passwordForm.get('newPassword')?.value);
      formdata.append('cnfPassword', this.passwordForm.get('cnfPassword')?.value);
      formdata.append('requestBy', 'Client');
      formdata.append('userId', this.login_data?.id);
      console.log(this.passwordForm.value);
      console.log(formdata);
      this._crud.post_change_password(formdata).subscribe(
        (response) => {
          if (response?.status === true) {
            console.log(response);
            this._shared.tostSuccessTop("Password updated successfully");
            this._router.navigate(['/loginclient']);
            this.passwordForm.reset()
          }
          else {
            console.log(response);
            this._shared.tostErrorTop('Some error found while changeing')
          }
        },
        (error) => {
          console.log(error);
          this._shared.tostErrorTop("Incorrect old password. try again");
        }
      )
    }
  }
}