import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/service/shared.service';

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
  description: boolean = false;
  finalSubmited: boolean = true;
  emailId: boolean = false;
  userInput: string = '';
  areaOfLawIssues: any[] = [];
  propertyIssues: any[] = [];
  cities: any[] = [];
  selectedCityId: string = '';
  clientForm!: FormGroup;
  cat_id: any;
  sub_cat_id: any;
  adv_type_id: any;

  constructor(
    private _crud: CrudService,
    private _router: Router,
    private fb: FormBuilder,
    private _shared: SharedService,
  ) {
    this.clientForm = this.fb.group({
      clientName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      ContactNum: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
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
  category_select(issue: any) {
    console.log(issue);
    this.cat_id = issue?.catId
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
  sub_cat_Issue(issue: any) {
    console.log(issue);
    this.sub_cat_id = issue.id;
    this.adv_type_id = issue.advTyId;
    this.addMessage(issue?.subcategoryName, 'me');
    this.showIssueList = false;
    setTimeout(() => {
      this.addMessage('I will send the details of right lawyers to you.', 'ai');
      this.addMessage('May I know your name please!', 'ai');
      this.inputVisible = true;
    }, 1000);
  }

  // Handle sending user input
  sendMessage() {
    this.userInput = String(this.userInput);
    if (this.userInput.trim()) {
      this.addMessage(this.userInput, 'me');
      if (this.inputVisible) {
        this.isAskingForPhoneNumber = true;
        this.inputVisible = false;
        this.userInput = '';
        setTimeout(() => {
          this.addMessage('What is your contact number?', 'ai');
        }, 1000);

      } else if (this.isAskingForPhoneNumber) {
        this.emailId = true;
        this.isAskingForPhoneNumber = false;
        this.userInput = '';
        setTimeout(() => {
          this.addMessage('What is your email address?', 'ai');
        }, 1000);

      } else if (this.emailId) {
        this.emailId = false;
        this.showCityList = true;
        this.userInput = '';
        setTimeout(() => {
          this.addMessage('Please select the city where you are looking for a lawyer.', 'ai');
        }, 1000);

      } else if (this.selectedCityId) {
        this.showCityList = false;
        console.log(this.adv_type_id);
        if (this.adv_type_id) {
          this.onSubmit();
        }
      }
    }
  }

  onSubmit() {
    const formdata = new FormData()
    console.log(this.clientForm.value, 'sent message');
    formdata.append('clientName', this.clientForm.get('clientName')?.value);
    formdata.append('email', this.clientForm.get('email')?.value);
    formdata.append('description', this.clientForm.get('description')?.value);
    formdata.append('ContactNum', this.clientForm.get('ContactNum')?.value);
    formdata.append('city', this.clientForm.get('city')?.value);
    formdata.append('catId', this.cat_id);
    formdata.append('subCatId', this.sub_cat_id);
    formdata.append('advTyId', this.adv_type_id);

    console.log(this.cat_id, 'cat id');
    console.log(this.sub_cat_id, 'sub cat id');
    this._crud.robot_find_lawyer(formdata).subscribe(
      (res: any) => {
        console.log(res, 'res');
        this._shared.tostSuccessTop('Success');
        if (res?.data !== null) {
          setTimeout(() => {
            this.addMessage(`You can contact ${res.data?.advocateName} on ${res.data?.contactNum} for your legal issue.`, 'ai');
            this.addMessage(`Lawyer details have been sent to your email id.`, 'ai');
            this.addMessage(`Have a good day.`, 'ai');
            this.finalSubmited = false;
          }, 1000);
        }
        else {
          setTimeout(() => {
            this.addMessage(`Thank you for legal enquiry. our top advocate will contact you soon.`, 'ai');
            this.addMessage(`Have a good day.`, 'ai');
            this.finalSubmited = false;
          }, 1000);
        }
      }
    )
  }

  // Handle selecting a city
  selectCity() {
    const selectedCity = this.cities.find(city => city.Id === this.selectedCityId)?.name;
    if (selectedCity) {
      this.addMessage(selectedCity, 'me');
      this.showCityList = false;
      this.description = true;

      setTimeout(() => {
        this.addMessage(`So, you are looking for legal advice from lawyers in ${selectedCity}.`, 'ai');
        this.addMessage(`Any specific details you want to share? Please type them below...`, 'ai');
      }, 1000);
    }
  }
}
