import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

export interface Message {
  text: string;
  sender: 'me' | 'ai';
}

@Component({
  selector: 'app-robot-chat',
  templateUrl: './robot-chat.component.html',
  styleUrls: ['./robot-chat.component.scss'],
  animations: [
    trigger('messageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('footerListAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class RobotChatComponent implements OnInit {
  messages: Message[] = [];
  showAreaOfLawList: boolean = false;
  showIssueList: boolean = false;
  inputVisible: boolean = false;
  userInput: string = '';
  
  areaOfLawIssues: string[] = [
    'Divorce/Matrimonial Issue',
    'Property Issue',
    'Family & Inheritance Issue',
    'Cheque/Loan/Recovery Issue',
    'Employment Issue',
    'Criminal Issue',
    'Consumer Court Issue',
    'Accident & Insurance Issue',
    'Armed Force Tribunal Issue',
    'Business / Corporate / Startup Issue',
    'Civil Matter / Something Else',
    'Supreme Court Issue'
  ];

  propertyIssues: string[] = [
    'Property Documentation / Verification',
    'Family Property Dispute',
    'Transfer of Ancestral Property',
    'Illegal Possession',
    'Illegal Construction',
    'Landlord / Tenant Issues',
    'Builder Delay / Fraud'
  ];

  constructor() { }

  ngOnInit() {
    this.startChat();
  }

  startChat() {
    this.addMessage('Hello', 'ai');
    setTimeout(() => {
      this.addMessage('What kind of legal issue are you facing?', 'ai');
      this.showAreaOfLawList = true;
    }, 1000);
  }

  addMessage(text: string, sender: 'me' | 'ai') {
    this.messages.push({ text, sender });
  }

  selectAreaOfLaw(issue: string) {
    this.addMessage(issue, 'me');
    this.showAreaOfLawList = false;

    setTimeout(() => {
      this.addMessage('What is your Property Issue related to?', 'ai');
      this.showIssueList = true;
    }, 1000);
  }

  selectPropertyIssue(issue: string) {
    this.addMessage(issue, 'me');
    this.showIssueList = false;

    setTimeout(() => {
      this.addMessage('I will send the details of the right lawyers to you.', 'ai');
      this.addMessage('Can I get your name, please?', 'ai');
      this.inputVisible = true;
    }, 1000);
  }

  sendMessage() {
    if (this.userInput.trim()) {
      this.addMessage(this.userInput, 'me');
      this.userInput = '';
      this.inputVisible = false;

      setTimeout(() => {
        this.addMessage('Thank you for choosing Vakil. I will send you the details on your email/mobile number.', 'ai');
      }, 1000);
    }
  }
}
