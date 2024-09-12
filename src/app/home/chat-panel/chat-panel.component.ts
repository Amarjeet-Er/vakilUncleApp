import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Message {
  text?: string;
  timestamp?: string;
  sender?: 'me' | 'other';
  date?: string; // Adding date as an optional property
}

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss'],
})
export class ChatPanelComponent implements OnInit {

  messages: Message[] = [
    { date: '12 July 2024' }, // First date entry
    { text: 'Hii, Madam', timestamp: '12:30PM', sender: 'me' },
    { text: 'Hello, Dear', timestamp: '12:31PM', sender: 'other' },
    { text: 'Hi, I need some legal advice regarding a contract.', timestamp: '12:32PM', sender: 'me' },
    { text: 'Hello! I\'d be happy to help. Can you tell me a bit more about the contract and what specifically you need advice on?', timestamp: '01:32PM', sender: 'other' },
    { text: 'I recently signed a freelance contract, but there are some terms I\'m not sure about. Specifically, I\'m concerned about the payment terms and intellectual property rights.', timestamp: '12:35PM', sender: 'me' },
    { text: 'I understand. Could you please provide me with a copy of the contract or the specific clauses you\'re worried about?', timestamp: '12:38PM', sender: 'other' },
    { date: '13 July 2024' }, // Extra date entry
    { text: 'Sure, here are the sections on payment terms and intellectual property rights: 1. Payment Terms: "The client agrees to pay the freelancer within 60 days of receiving the invoice." 2. Intellectual Property Rights: "All work produced by the freelancer during the contract period will be the sole property of the client."', timestamp: '12:42PM', sender: 'me' },
    { text: 'Thank you for sharing that. Let\'s break these down one by one.', timestamp: '12:45PM', sender: 'other' },
    { text: 'Yes, that makes sense. I didn’t realize 60 days was long.', timestamp: '12:45PM', sender: 'me' },
    { text: 'Great. Now, on to the Intellectual Property Rights. This clause means that any work you create while under this contract belongs entirely to the client. If you wish to retain any rights to your work, you should negotiate this clause. For example, you might want to retain rights to use the work in your portfolio.', timestamp: '12:47PM', sender: 'other' },
    { text: 'I see. I definitely want to be able to showcase my work in my portfolio. How should I phrase this?', timestamp: '12:50PM', sender: 'me' },
    { text: 'You could propose a clause like this: "The freelancer retains the right to use the work produced during the contract period in their portfolio and for self-promotion purposes.', timestamp: '12:51PM', sender: 'other' },
    { text: 'That sounds perfect. I’ll suggest that change. Thank you so much for your help!', timestamp: '12:53PM', sender: 'me' },
    { text: 'You\'re welcome! If you need any further assistance or have more questions, feel free to reach out.', timestamp: '12:55PM', sender: 'other' },
    { date: '14 July 2024' },
    { text: 'Will do. Thanks again!', timestamp: '12:58PM', sender: 'me' },
    { text: 'My pleasure. Have a great day!', timestamp: '01:00PM', sender: 'other' },
  ];

  constructor(private _router: Router) {}

  ngOnInit() {}

  openFile() {
    alert('file open');
  }

  advocateProfile() {
    this._router.navigate(['/home/advocateportfolio']);
  }
}
