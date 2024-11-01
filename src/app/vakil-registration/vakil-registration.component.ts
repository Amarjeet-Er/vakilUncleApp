import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { CrudService } from '../service/crud.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-vakil-registration',
  templateUrl: './vakil-registration.component.html',
  styleUrls: ['./vakil-registration.component.scss'],
})
export class VakilRegistrationComponent implements OnInit {
  segmentValue = 'vakil';
  @ViewChild('veryotp') veryotp!: IonModal;
  @ViewChild('vakilregistration') vakilregistration!: IonModal;
  vakil_Registration_Form !: FormGroup;
  Send_OTP_Form !: FormGroup;
  Verify_OTP_Form !: FormGroup;
  states: any;
  citys: any;
  Aadhar_select: any;
  BarCouncil: any;
  vakilEmail: any;
  passwordsMatch: boolean = false;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _crud: CrudService,
    private _shared: SharedService
  ) {
    this._crud.get_state().subscribe(
      (res: any) => {
        if (res.status === true) {
          this.states = res.data;
          console.log(this.states, 'res');
        }
      }
    )
  }
  onCityChange(event: any) {
    const selectedId = event.detail.value;
    console.log(selectedId);
    this._crud.get_city(selectedId).subscribe(
      (res: any) => {
        if (res.status === true) {
          this.citys = res.data;
          console.log(this.citys, 'res');
        }
      }
    )
  }

  ngOnInit() {
    this.Send_OTP_Form = this._formBuilder.group({
      email: ['', Validators.required],
    });

    this.Verify_OTP_Form = this._formBuilder.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required],
      digit6: ['', Validators.required],
    });

    this.vakil_Registration_Form = this._formBuilder.group({
      advocateName: ['', Validators.required],
      contactNum: ['', [Validators.required, Validators.pattern('\\d{10}')]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      adhar: ['', Validators.required],
      barCouncil: ['', Validators.required],
      gender: ['', Validators.required],
      pass: [
        '', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/)
        ]
      ],
      ConfirmPassword: ['', Validators.required],
    });
  }

  OnOtpSend() {
    if (this.Send_OTP_Form.invalid) {
      this._shared.tostErrorTop('Please fill all the fields');
      return;
    }
    const email = this.Send_OTP_Form.value.email;
    this._crud.verify_email(email).subscribe(
      (res: any) => {
        if (res.status === false) {
          localStorage.setItem('vakilEmail', JSON.stringify(email));
          this._crud.otp_send(email).subscribe(
            (otpRes: any) => {
              if (otpRes.status === true && otpRes.OTP) {
                localStorage.setItem('otpData', JSON.stringify(otpRes.OTP));
                this._shared.tostSuccessTop('OTP sent successfully');
                this.veryotp.present();
              } else {
                this._shared.tostWrraingTop('OTP not sent. Try again');
              }
            },
            (error) => {
              this._shared.tostErrorTop('Error sending OTP');
              console.error('OTP Send Error:', error);
            }
          );
        } else {
          this._shared.tostErrorTop('Already Register Email');
        }
      },
      (error: any) => {
        this._shared.tostErrorTop('Error verifying email');
        console.error('Email Verification Error:', error);
      }
    );
  }


  //  logic to verify OTP here
  async confirmOtp() {
    const digit1 = this.Verify_OTP_Form.get('digit1')?.value;
    const digit2 = this.Verify_OTP_Form.get('digit2')?.value;
    const digit3 = this.Verify_OTP_Form.get('digit3')?.value;
    const digit4 = this.Verify_OTP_Form.get('digit4')?.value;
    const digit5 = this.Verify_OTP_Form.get('digit5')?.value;
    const digit6 = this.Verify_OTP_Form.get('digit6')?.value;
    const verifyOtp = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`;
    console.log('verifyOtp:', verifyOtp);
    const otpData = localStorage.getItem('otpData');
    console.log(otpData, 'confirm otp amr');

    if (otpData == verifyOtp) {
      this.vakilregistration.present()
      this._shared.tostSuccessTop('OTP matched');
    }
    else {
      this._shared.tostWrraingTop('OTP does not match');
    }
  }

  // for select Aadhar Card
  onAadhar(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('File content:', reader.result);
        this.Aadhar_select = file;
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
    }
  }
  // for select BarCouncil
  onBarCouncil(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('File content:', reader.result);
        this.BarCouncil = file;
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
    }
  }

  async signUp() {
    const emailId = localStorage.getItem('vakilEmail');
    this.vakilEmail = emailId?.replace(/^"|"$/g, '');
    console.log(this.vakilEmail, 'vakilEmail');

    console.log(this.vakil_Registration_Form.value);
    if (this.vakil_Registration_Form.valid) {
      const formdata = new FormData();
      formdata.append('advocateName', this.vakil_Registration_Form.value.advocateName);
      formdata.append('contactNum', this.vakil_Registration_Form.value.contactNum);
      formdata.append('gender', this.vakil_Registration_Form.value.gender);
      formdata.append('email', this.vakilEmail);
      formdata.append('state', this.vakil_Registration_Form.value.state);
      formdata.append('city', this.vakil_Registration_Form.value.city);
      formdata.append('adhar', this.Aadhar_select);
      formdata.append('barCouncil', this.BarCouncil);
      console.log('adhar', this.Aadhar_select);
      console.log('BarCouncil', this.BarCouncil);

      if (this.vakil_Registration_Form.get('pass')?.value === this.vakil_Registration_Form.get('ConfirmPassword')?.value) {
        const vakilPassword = this.vakil_Registration_Form.get('pass')?.value;
        if (vakilPassword) {
          formdata.append('pass', vakilPassword);
          this.passwordsMatch = false;
        }
      } else {
        this.passwordsMatch = true;
        return;
      }

      try {
        this._crud.vakil_registartion(formdata).subscribe(
          (response) => {
            console.log(response);
            this._router.navigate(['/login']);
            this._shared.tostSuccessTop('Registration successful!');
          }
        )
      } catch (error) {
        console.error('Registration failed:', error);
        this._shared.tostErrorTop('Registration failed. Please try again.');
      } finally {
        this.veryotp.dismiss();
        this.vakilregistration.dismiss();
      }
    }
    else {
      this._shared.tostErrorTop('Please fill all the fields');
    }
  }


  onInputChange(event: any, nextInput: HTMLInputElement | null) {
    const input = event.target as HTMLInputElement;
    if (input.value && nextInput) {
      nextInput.focus();
    }
  }

  onInputKeyDown(event: KeyboardEvent, currentInput: HTMLInputElement, previousInput: HTMLInputElement | null) {
    if (currentInput.value && event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }
    if (event.key === 'Backspace') {
      if (currentInput.value) {
        currentInput.value = '';
      } else if (previousInput) {
        previousInput.focus();
        previousInput.value = '';
      }
    }
  }
  Login() {
    this._router.navigate(['/login']);
  }
}
