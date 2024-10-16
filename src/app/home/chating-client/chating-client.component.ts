import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-chating-client',
  templateUrl: './chating-client.component.html',
  styleUrls: ['./chating-client.component.scss'],
})
export class ChatingClientComponent implements OnInit {
  chat_message!: FormGroup
  UserId: any;
  user_id: any;
  img_url: any;
  messages: any;


  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService,
    private _fb: FormBuilder,
  ) {
    this.UserId = localStorage.getItem('clientChat');
    this.user_id = JSON.parse(this.UserId);
    this._shared.img_url.subscribe(
      (res: any) => {
        this.img_url = res
      }
    )
  }

  ngOnInit() {
    this.chat_message = this._fb.group({
      message: ['', Validators.required],
      senderId: [''],
      recieverId: [''],
      sendby: [''],
    });
  }

  advocateProfile() {
    this._router.navigate(['/home/advocateportfolio']);
  }
}
