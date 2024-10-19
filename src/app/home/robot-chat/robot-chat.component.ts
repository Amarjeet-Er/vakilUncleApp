import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  showCityList: boolean = false;
  inputVisible: boolean = false;
  isAskingForPhoneNumber: boolean = false;
  finalSubmited: boolean = true;
  emailId: boolean = false;
  userInput: string = '';
  areaOfLawIssues: any[] = [];
  propertyIssues: any[] = [];
  cities: any[] = [];
  selectedCityId: string = '';
  clientForm!: FormGroup;

  constructor(
    private _crud: CrudService,
    private _router: Router,
    private fb: FormBuilder
  ) {
    this.clientForm = this.fb.group({
      clientName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      contactNum: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // only numbers
      city: ['', Validators.required],
      subCatId: ['', Validators.required],
      catId: ['', Validators.required],
      advTyId: ['', Validators.required],
    });
    this._crud.get_city_list().subscribe(
      (res: any) => {
        this.cities = res.data;
        console.log(res);
      }
    )
  }

  ngOnInit() {
    this.startChat();
  }

  // Start the chat and ask for legal issue
  startChat() {
    setTimeout(() => {
      this.addMessage('Hello! What kind of legal issue are you facing?', 'ai');
      this.fetchAreaOfLawIssues();
    }, 1000);
  }

  // Add message to the chat
  addMessage(text: string, sender: 'me' | 'ai') {
    this.messages.push({ text, sender });
  }

  // Fetch area of law issues
  fetchAreaOfLawIssues() {
    this._crud.get_robot_cat().subscribe(
      (response: any) => {
        console.log(response.data);
        
        if (response && response.data) {
          this.areaOfLawIssues = response.data;
          this.showAreaOfLawList = true;
        }
      },
      error => console.error(error)
    );
  }

  // Handle selecting an area of law
  selectAreaOfLaw(issue: any) {
    console.log(issue);
    
    this.addMessage(issue?.categoryName, 'me');
    this.showAreaOfLawList = false;

    this._crud.get_robot_cat_id(issue?.catId).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.propertyIssues = response.data;
          this.showIssueList = true;
          this.addMessage(`What is your ${issue?.categoryName} related to?`, 'ai');
        }
      },
      error => console.error(error)
    );
  }

  // Handle selecting a property issue
  selectPropertyIssue(issue: string) {
    this.addMessage(issue, 'me');
    this.showIssueList = false;
    setTimeout(() => {
      this.addMessage('I will send the details of right lawyers to you.', 'ai');
      this.addMessage('May I know your name please!', 'ai');
      this.inputVisible = true; // Show input for user name
    }, 1000);
  }

  // Handle sending user input
  sendMessage() {
    if (this.userInput.trim()) {
      this.addMessage(this.userInput, 'me');
      this.userInput = '';

      if (this.inputVisible) {
        this.isAskingForPhoneNumber = true;
        this.inputVisible = false;
        setTimeout(() => {
          this.addMessage('What is your contact number?', 'ai');
        }, 1000);
      } else if (this.isAskingForPhoneNumber) {
        this.emailId = true;
        this.isAskingForPhoneNumber = false;
        setTimeout(() => {
          this.addMessage('What is your email address?', 'ai');
        }, 1000);
      }
      else if (this.emailId) {
        this.emailId = false;
        this.showCityList = true;
        setTimeout(() => {
          this.addMessage('Please select the city where you are looking for a lawyer.', 'ai');
        }, 1000);
      }
      else if (this.selectedCityId) {
        this.emailId = false;
        this.showCityList = false;
        this.onSubmit()
        if (this.selectedCityId == this.selectedCityId) {
          setTimeout(() => {
            this.addMessage(`You can contact RUDRA SINGH on 9838627233 for your legal issue.`, 'ai');
            this.addMessage(`Lawyer details have been sent to your email id.`, 'ai');
            this.addMessage(`Have a good day.`, 'ai');
            this.finalSubmited = false
          }, 1000);
        }
        else {
          setTimeout(() => {
            this.addMessage(`Thank you for legal enquiry. our top advocate will contact you soon.`, 'ai');
            this.addMessage(`Have a good day.`, 'ai');
            this.finalSubmited = false
          }, 1000);
        }
      }
    }
  }
  onSubmit() {
    console.log(this.clientForm.value.selectedCityId, 'sent message');
  }

  // Handle selecting a city
  selectCity() {
    const selectedCity = this.cities.find(city => city.Id === this.selectedCityId)?.name;

    if (selectedCity) {
      this.addMessage(selectedCity, 'me'); // Display selected city
      this.showCityList = false;

      setTimeout(() => {
        this.addMessage(`So, you are looking for legal advice from lawyers in ${selectedCity}.`, 'ai');
        this.addMessage(`Any specific details you want to share? Please type them below...`, 'ai');
      }, 1000);
    }
  }
}
