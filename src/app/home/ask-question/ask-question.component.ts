import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss'],
})
export class AskQuestionComponent  implements OnInit {

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }


  isChecked: boolean = false;

  constructor() { }

  ngOnInit() { }



}
