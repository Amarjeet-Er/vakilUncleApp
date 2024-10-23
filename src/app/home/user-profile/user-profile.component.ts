import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  client_profile_update!: FormGroup
  selectedProfileImage: any;
  states: any;
  citys: any;
  BarCouncil: any;

  login: any;
  login_data: any;
  vId: any;
  dashboard: any;
  img_url: any;

  profile_select: any;
  profile_url: any = "../../../assets/icon/profile.png"
  profileSelect: boolean = true
  profileSelected: boolean = false

  court_list: any;
  advocate_type: any;
  stateId: any;
  profile_data: any;
  edit_profile_data: any;


  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService,
    private _formBuilder: FormBuilder
  ) {
    this.login = localStorage.getItem('userLoginData');
    this.login_data = JSON.parse(this.login);
  }

  ngOnInit() {
    this.initializeForm();
    this._crud.get_client_profile(this.login_data.id).subscribe(
      (res: any) => {
        this.edit_profile_data = res.data;
        console.log(this.edit_profile_data, 'edit');
        this.patchProfileForm();
      }
    );
    this.fetchDropdownData();
  }

  initializeForm() {
    this.client_profile_update = this._formBuilder.group({
      clientName: ['', Validators.required],
      contactNum: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      profile: [''],
    });
  }

  patchProfileForm() {
    if (this.edit_profile_data) {
      this.client_profile_update.patchValue(this.edit_profile_data);
      this.stateId = this.edit_profile_data.state;
      console.log(this.stateId, 'Selected State ID');
      this.onCityChange({ detail: { value: this.stateId } });
    }
  }


  fetchDropdownData(): void {
    this._shared.img_url.subscribe((data: any) => { this.img_url = data; })
    this._crud.get_state().subscribe((res: any) => { if (res.status === true) { this.states = res.data; } })
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

  // for select profile
  onProfile(files: any) {
    this.profileSelect = false
    this.profileSelected = true
    if (files.length > 0) {
      const reader = new FileReader();
      this.profile_select = files[0];
      reader.onload = () => {
        this.profile_url = reader.result;
      };
      reader.readAsDataURL(this.profile_select);
    } else {
      console.log('No file selected');
    }
  }


  async submit() {
    console.log(this.client_profile_update.value);

    const formUpdate = new FormData();
    formUpdate.append('ClientId', this.login_data.id);
    formUpdate.append('clientName', this.client_profile_update.get('clientName')?.value);
    formUpdate.append('email', this.client_profile_update.get('email')?.value);
    formUpdate.append('state', this.client_profile_update.get('state')?.value);
    formUpdate.append('city', this.client_profile_update.get('city')?.value);
    formUpdate.append('gender', this.client_profile_update.get('gender')?.value);
    formUpdate.append('address', this.client_profile_update.get('address')?.value);
    formUpdate.append('profileImage', this.profile_select || null);

    if (this.client_profile_update.valid) {
      this._crud.client_profile_update(formUpdate).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status === true) {
            this._shared.tostSuccessTop('Profile updated successfully');
            this._router.navigate(['/user/home']);
          } else {
            this._shared.tostErrorTop(res.message);
            this._shared.tostErrorTop('Not Update');
          }
        },
        (error: any) => {
          console.log(error);
          this._shared.tostErrorTop('Not Update');
        }
      );
    } else {
      this._shared.tostErrorTop('Please fill all the fields');
    }
  }


  isEdit: boolean = true
  onEdit() {
    if (this.isEdit == true) {
      this.isEdit = false
    } else {
      this.isEdit = true
    }
  }
}
