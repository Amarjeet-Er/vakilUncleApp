import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vakil-support-request',
  templateUrl: './vakil-support-request.component.html',
  styleUrls: ['./vakil-support-request.component.scss'],
})
export class VakilSupportRequestComponent implements OnInit {


  ngOnInit() { }
  supportRequestForm: FormGroup;

  constructor(private fb: FormBuilder, private alertController: AlertController) {
    this.supportRequestForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.supportRequestForm.valid) {
      // Handle support request logic (e.g., send to backend)
      const alert = await this.alertController.create({
        header: 'Request Submitted',
        message: 'Your support request has been submitted successfully.',
        buttons: ['OK']
      });
      await alert.present();
      this.supportRequestForm.reset();
    }
  }
}