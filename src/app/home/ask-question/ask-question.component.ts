import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss'],
})
export class AskQuestionComponent implements OnInit {
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  isChecked: boolean = false;
  ask_free_question_form!: FormGroup
  advocated_type: any;
  city_list: any[] = [];
  cityName: string = '';
  city_id: any

  constructor(
    private _fb: FormBuilder,
    private _crud: CrudService,
    private _shared: SharedService,
    private _router: Router
  ) {
    this._crud.get_advocate_type().subscribe(
      (res: any) => {
        this.advocated_type = res.data
      }
    )

  }

  ngOnInit() {
    this.ask_free_question_form = this._fb.group({
      LawType: ['', Validators.required],
      city: ['', Validators.required],
      Question: ['', Validators.required],
      subject: ['', Validators.required],
      cn_name: ['', Validators.required],
      cn_phone: ['', [Validators.required, Validators.pattern('\\d{10}')]],
      cn_email: ['', Validators.required],
      IsInterested: ['', Validators.required],
    });
  }


  cityPlace(city: any) {
    this.city_id = city?.Id;
    this.cityName = city?.name;
    this.city_list.length = 0;
  }

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    console.log(query);
    if (query.trim().length > 0) {
      this._crud.get_city_list().subscribe(
        (res: any) => {
          this.city_list = res.data.filter((city: any) =>
            city.name.toLowerCase().includes(query)
          );
        },
        (error) => {
          console.error('Error fetching city list', error);
        }
      );
    } else {
      this.city_list = [];
    }
  }

  onSubmit() {
    console.log(this.ask_free_question_form.value);
    const formdata = {
      LawType: this.ask_free_question_form.get('LawType')?.value,
      city: this.city_id,
      Question: this.ask_free_question_form.get('Question')?.value,
      subject: this.ask_free_question_form.get('subject')?.value,
      cn_name: this.ask_free_question_form.get('cn_name')?.value,
      cn_phone: this.ask_free_question_form.get('cn_phone')?.value,
      cn_email: this.ask_free_question_form.get('cn_email')?.value,
      IsInterested: this.ask_free_question_form.get('IsInterested')?.value
    };

    if (this.ask_free_question_form.valid) {
      this._crud.post_ask_free_question(formdata).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status === "success") {
            this._shared.tostSuccessTop('Success');
            this.ask_free_question_form.reset();
            this._router.navigate(['/user/home/dashboard'])
          }
          else {
            this._shared.tostErrorTop('Data Not Insert');
          }
        },
        (error: any) => {
          console.error('Error sending form', error);
          this._shared.tostErrorTop('Data Not Insert');
        }
      )
    }
    else {
      this._shared.tostErrorTop('Please fill all the fields');
    }
  }
}
