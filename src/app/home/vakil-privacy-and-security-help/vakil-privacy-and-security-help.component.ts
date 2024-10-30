import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-vakil-privacy-and-security-help',
  templateUrl: './vakil-privacy-and-security-help.component.html',
  styleUrls: ['./vakil-privacy-and-security-help.component.scss'],
})
export class VakilPrivacyAndSecurityHelpComponent  implements OnInit {


  ngOnInit() {}
  constructor(private navCtrl: NavController) {}

  openPrivacyPolicy() {
    // Navigate to the privacy policy page or open a modal with the policy text
    this.navCtrl.navigateForward('/privacy-policy');
  }

  openFAQ(faqId: string) {
    // Navigate to the FAQ details page or show a modal with the FAQ answer
    this.navCtrl.navigateForward(`/faq/${faqId}`);
  }

}
