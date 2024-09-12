import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { CrudService } from '../service/crud.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('modal') modal!: IonModal;

  forgotForm !: FormGroup
  Verify_OTP_Form !: FormGroup

  constructor(
    private _router: Router,
    private _fromBuilder: FormBuilder,
    private _crud: CrudService,
    private _shared: SharedService,
  ) { }

  ngOnInit() {
    this.forgotForm = this._fromBuilder.group({
      email: ['', Validators.required]
    })

    this.Verify_OTP_Form = this._fromBuilder.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required],
      digit6: ['', Validators.required],
    });
  }

  // send otp on mail id 
  async sendOtp() {    const email = this.forgotForm.value.email;

    this._crud.verify_email(email).subscribe(
      (res: any) => {
        if (res.status === true) {
          this._crud.otp_send(email).subscribe(
            (otpRes: any) => {
              if (otpRes.status === true && otpRes.OTP) {
                localStorage.setItem('otpData', JSON.stringify(otpRes.OTP));
                this.modal.present();
                this._shared.tostSuccessTop('OTP sent successfully');
              } else {
                this._shared.tostWrraingTop('Failed to send OTP. Please try again.');
              }
            },
            (error) => {
              this._shared.tostErrorTop('Error sending OTP. Please try again later.');
            }
          );
        } else {
          this._shared.tostWrraingTop('Email does not exist. Please enter a valid email.');
        }
      },
      (error) => {
        this._shared.tostErrorTop('Error verifying email. Please try again later.');
      }
    );
  }

  async confirmOtp(modal: any) {
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
      this._router.navigate(['/confirmpassword'])
      this.modal.dismiss()
      this._shared.tostSuccessTop('OTP matched');
    }
    else {
      this._shared.tostWrraingTop('OTP does not match');
    }
  }



  // here user enter number/otp in input field 
  onInputChange(event: any, nextInput: HTMLInputElement | null) {
    const input = event.target as HTMLInputElement;

    // Move focus to the next input field if it exists
    if (input.value && nextInput) {
      nextInput.focus();
    }
  }

  onInputKeyDown(event: KeyboardEvent, currentInput: HTMLInputElement, previousInput: HTMLInputElement | null) {
    // Prevent input if the current field already contains a value (except for backspace and delete keys)
    if (currentInput.value && event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }

    // Handle backspace key
    if (event.key === 'Backspace') {
      if (currentInput.value) {
        currentInput.value = '';
      } else if (previousInput) {
        previousInput.focus();
        previousInput.value = '';
      }
    }
  }

  //  logic to verify OTP here
  // async confirmOtp(modal: any) {
  //   this._router.navigate(['/confirmpassword'])
  //   alert("OTP match")
  //   modal.dismiss()
  // }
}
