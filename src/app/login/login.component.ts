import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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

            if (res.UserRole == "Advocate") {
              this._shared.tostSuccessTop('Login Successfully...')
              localStorage.setItem('vakilLoginData', JSON.stringify(res.data))
              if (res.CompleteProfile === true) {
                this._router.navigate(['/vakil/home/dashboard']);
              }
              else {
                this._router.navigate(['/home/vakilprofile']);
              }
            }
            else if (res.UserRole == "Client") {
              const userLogin = {
                userId: res.data.enrollId,
                userName: res.data.advocateName,
                userEmail: res.data.email,
                userStatus: res.data.status,
                userMobile: res.data.contactNum,
              }
              this._shared.tostSuccessTop('Login Successfully...')
              localStorage.setItem('userLoginData', JSON.stringify(userLogin))
              this._router.navigate(['/user/home/dashboard']);
            }
            else {
              this._shared.tostErrorTop('Not Login');
            }
          },
          (error) => {
            this._shared.tostErrorTop('Invalid User Id or Password');
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
    this._router.navigate(['/signup']);
  }
}