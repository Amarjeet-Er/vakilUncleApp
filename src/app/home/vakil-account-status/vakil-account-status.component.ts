import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vakil-account-status',
  templateUrl: './vakil-account-status.component.html',
  styleUrls: ['./vakil-account-status.component.scss'],
})
export class VakilAccountStatusComponent implements OnInit {
  ngOnInit(): void {

  }
  constructor(private alertController: AlertController) { }

  async renewAccount() {
    const alert = await this.alertController.create({
      header: 'Renew Account',
      message: 'Would you like to renew your account for another year?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Renew',
          handler: () => {
            // Handle renewal logic
          }
        }
      ]
    });
    await alert.present();
  }

  async upgradeAccount() {
    const alert = await this.alertController.create({
      header: 'Upgrade Account',
      message: 'Upgrade to Pro for additional benefits!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Upgrade',
          handler: () => {
            // Handle upgrade logic
          }
        }
      ]
    });
    await alert.present();
  }
}