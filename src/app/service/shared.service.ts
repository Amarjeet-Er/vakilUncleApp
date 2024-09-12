import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  base_url = new BehaviorSubject<string>('https://vakiluncle.in/api/');

  constructor(private toastController: ToastController) {}

  // for messages toast notification
  async tostSuccessTop(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      position: 'top',
      cssClass: 'tostSuccess'
    });
    toast.present();
  }
  async tostErrorTop(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      position: 'top',
      cssClass: 'tostError'
    });
    toast.present();
  }
  async tostWrraingTop(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      position: 'top',
      cssClass: 'tostWarring'
    });
    toast.present();
  }
}
