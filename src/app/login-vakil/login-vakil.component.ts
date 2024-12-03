import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-login-vakil',
  templateUrl: './login-vakil.component.html',
  styleUrls: ['./login-vakil.component.scss'],
})
export class LoginVakilComponent implements OnInit {
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
              const vakilLogin = {
                advId: res.data.advId,
                enrollId: res.data.enrollId,
                advocateName: res.data.advocateName,
                email: res.data.email,
                contactNum: res.data.contactNum,
                status: res.status,
                plan: res.plan,
              }
              this._shared.tostSuccessTop('Login Successfully...')
              localStorage.setItem('vakilLoginData', JSON.stringify(vakilLogin))
              this._router.navigate(['/vakil/home/dashboard']);
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
    this._router.navigate(['/vakilforgotpassword']);
  }

  SignUp() {
    this._router.navigate(['/vakilregistration']);
  }
}