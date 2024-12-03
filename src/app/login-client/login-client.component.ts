import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.scss'],
})
export class LoginClientComponent implements OnInit {

  isPasswordVisible: boolean = false;
  loginForm !: FormGroup
  showPassword = false;
  newUsername: any
  newPassword: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService
  ) {
    localStorage.removeItem
    localStorage.clear()
  }
  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      userid: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  async login() {
    this.newUsername = this.loginForm.value.userid.trim();
    this.newPassword = this.loginForm.value.Password.trim();

    const data = {
      userid: this.newUsername,
      password: this.newPassword,
    };

    try {
      if (this.loginForm.valid) {
        this._crud.login(data).subscribe(
          (res: any) => {
            console.log(res, 'login');
            if (res.UserRole == "Client") {
              const clientLogin = {
                id: res.data.id,
                clientName: res.data.clientName,
                email: res.data.email,
                contactNum: res.data.contactNum,
              }
              this._shared.tostSuccessTop('Login Successfully...')
              localStorage.setItem('userLoginData', JSON.stringify(clientLogin))
              this._router.navigate(['/user/home/dashboard']);
            }
            else {
              this._shared.tostErrorTop('Invalid User Id or Password');
            }
          },
          (error) => {
            this._shared.tostErrorTop(error);
          }
        );
      } else {
        this._shared.tostErrorTop('Please fill out the required fields.');
      }
    } catch (error) {
      this._shared.tostErrorTop('An error occurred during login');
    }
  }


  // Navigate to forgot password page
  forgotPassword() {
    this._router.navigate(['/forgotpassword']);
  }

  SignUp() {
    this._router.navigate(['/clientregistration']);
  }
}