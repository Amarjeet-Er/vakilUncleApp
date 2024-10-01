import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-new-client-reg',
  templateUrl: './new-client-reg.component.html',
  styleUrls: ['./new-client-reg.component.scss'],
})
export class NewClientRegComponent implements OnInit {
  @ViewChild('modal') modal !: IonModal;
  @ViewChild('details') details !: IonModal;
  detail: any
  login: any;
  login_data: any;
  clients: any;
  img_url: any;
  newRegistartion_form!: FormGroup;
  states: any;
  citys: any;
  court_list: any;
  Aadhar_select: any;
  filterData: any;

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService,
    private _fb: FormBuilder
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);

    this._shared.img_url.subscribe(
      (data: any) => {
        this.img_url = data;
      }
    )
  }
  ngOnInit() {
    this.newRegistartion_form = this._fb.group({
      clientName: ['', Validators.required],
      email: ['', Validators.required],
      contactNum: ['', [Validators.required, Validators.pattern('\\d{10}')]],
      password: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      caseNo: ['', Validators.required],
      caseTitle: ['', Validators.required],
      court: ['', Validators.required],
      act: ['', Validators.required],
      HearingDate: ['', Validators.required],
      firDate: ['', Validators.required],
      caseSummary: ['', Validators.required],
      advocateFee: ['', Validators.required],
      document: [''],
    }
    )

    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });

    this.loadData();
    this.fetchDropdownData();
  }

  loadData() {
    this._crud.get_new_Client(this.login_data.advId).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status === true) {
          this.clients = res.data;
          this.filterData = res.data;
        }
      }
    )
  }

  fetchDropdownData(): void {
    this._shared.img_url.subscribe((data: any) => { this.img_url = data; })
    this._crud.get_state().subscribe((res: any) => { if (res.status === true) { this.states = res.data; } })
    this._crud.get_court_list().subscribe((res: any) => { if (res.status === true) { this.court_list = res.data; } })
  }

  onCityChange(event: any) {
    const selectedId = event.detail.value;
    console.log(selectedId);
    this._crud.get_city(selectedId).subscribe(
      (res: any) => {
        if (res.status === true) {
          this.citys = res.data;
        }
      }
    )
  }


  AddClientReg() {
    this.modal.present()
  }
  onClientDetails(data: any) {
    console.log(data, 'data');
    this.detail = data;
    this.details.present();
  }

  backButton() {
    if (this.modal || this.details) {
      this.modal.dismiss();
      this.details.dismiss();
    }
  }

  // for select Aadhar Card
  onAadhar(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const fileArray: any[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e: any) => {
          // Storing file details
          fileArray.push({
            name: file.name,
            content: e.target.result
          });
          console.log('File content:', e.target.result);
        };

        reader.readAsDataURL(file);
      }
      // Store or process the selected files
      this.Aadhar_select = fileArray;
      console.log(this.Aadhar_select, 'file');

    } else {
      console.log('No files selected');
    }
  }

  onSubmit() {
    console.log(this.newRegistartion_form.value);

    const formdata = new FormData();
    formdata.append('vakilId', this.login_data.advId);
    formdata.append('clientName', this.newRegistartion_form.get('clientName')?.value)
    formdata.append('email', this.newRegistartion_form.get('email')?.value)
    formdata.append('contactNum', this.newRegistartion_form.get('contactNum')?.value)
    formdata.append('password', this.newRegistartion_form.get('password')?.value)
    formdata.append('state', this.newRegistartion_form.get('state')?.value)
    formdata.append('city', this.newRegistartion_form.get('city')?.value)
    formdata.append('address', this.newRegistartion_form.get('address')?.value)
    formdata.append('caseNo', this.newRegistartion_form.get('caseNo')?.value)
    formdata.append('caseTitle', this.newRegistartion_form.get('caseTitle')?.value)
    formdata.append('court', this.newRegistartion_form.get('court')?.value)
    formdata.append('act', this.newRegistartion_form.get('act')?.value)
    formdata.append('HearingDate', this.newRegistartion_form.get('HearingDate')?.value)
    formdata.append('firDate', this.newRegistartion_form.get('firDate')?.value)
    formdata.append('caseSummary', this.newRegistartion_form.get('caseSummary')?.value)
    formdata.append('advocateFee', this.newRegistartion_form.get('advocateFee')?.value)
    formdata.append('document', JSON.stringify(this.Aadhar_select));
    console.log(formdata, 'formdata');
    if (this.newRegistartion_form.valid) {
      this._crud.new_Client_register(formdata).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status === true) {
            this._shared.tostSuccessTop('Client Registered Successfully');
            this.clients.unshift(res.data);
            this.filterData = [...this.clients];
            this.modal.dismiss();
            this.details.dismiss();
          }
          else {
            this._shared.tostErrorTop(res.message);
          }
        },
        (error: any) => {
          this._shared.tostErrorTop('An error has occurred')
        }
      )
    }
    else {
      this._shared.tostErrorTop('Please fill all the fields');
    }
  }

  onSearch(event: any) {
    const filter = event.target.value.toLowerCase();
    this.clients = this.filterData.filter((data: any) => {
      if (data?.clientName.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.contactNum.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.caseNo.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );
  }
}