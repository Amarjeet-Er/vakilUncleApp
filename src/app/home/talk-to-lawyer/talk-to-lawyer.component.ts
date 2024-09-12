import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-talk-to-lawyer',
  templateUrl: './talk-to-lawyer.component.html',
  styleUrls: ['./talk-to-lawyer.component.scss'],
})
export class TalkToLawyerComponent implements OnInit {
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  @ViewChild('talktolawyer') talktolawyer !: IonModal;

  isChecked: boolean = false;

  constructor() { }

  ngOnInit() { }

  submit() {
    this.talktolawyer.present()
  }
}
