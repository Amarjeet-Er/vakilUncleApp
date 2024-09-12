import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-vakil-profile',
  templateUrl: './vakil-profile.component.html',
  styleUrls: ['./vakil-profile.component.scss'],
})
export class VakilProfileComponent implements OnInit {
  vakil_profile_update!: FormGroup
  selectedProfileImage: any;
  // profileInfo: any;
  states: any;
  citys: any;
  Aadhar_select: any;
  BarCouncil: any;
  profileInfo = {
    Profile_image: 'https://png.pngitem.com/pimgs/s/130-1300400_user-hd-png-download.png',
  };

  constructor(
    private _crud: CrudService,
    private _shared: SharedService,
    private _formBuilder: FormBuilder
  ) {

    this._crud.get_state().subscribe(
      (res: any) => {
        if (res.status === true) {
          this.states = res.data;
          console.log(this.states, 'res');
        }
      }
    )
  }
  onCityChange(event: any) {
    const selectedId = event.detail.value;
    console.log(selectedId);
    this._crud.get_city(selectedId).subscribe(
      (res: any) => {
        if (res.status === true) {
          this.citys = res.data;
          console.log(this.citys, 'res');
        }
      }
    )
  }

  ngOnInit() {
    this.vakil_profile_update = this._formBuilder.group({
      advocateName: ['', Validators.required],
      contactNum: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      courtType: ['', Validators.required],
      advType: ['', Validators.required],
      experiance: ['', Validators.required],
      DOB: ['', Validators.required],
      llbRegistrationNum: ['', Validators.required],
      offAddress: ['', Validators.required],
      adhar: ['', Validators.required],
      barCouncil: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  // for select Aadhar Card
  onAadhar(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('File content:', reader.result);
        this.Aadhar_select = file;
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
    }
  }
  // for select BarCouncil
  onBarCouncil(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('File content:', reader.result);
        this.BarCouncil = file;
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
    }
  }

  openFile() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedProfileImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  }

  submit() {
    console.log('Profile Info Submitted:', this.profileInfo);
  }
}
