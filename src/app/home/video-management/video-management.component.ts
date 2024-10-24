import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
import { Clipboard } from '@capacitor/clipboard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-video-management',
  templateUrl: './video-management.component.html',
  styleUrls: ['./video-management.component.scss'],
})
export class VideoManagementComponent implements OnInit {
  @ViewChild('modal') modal !: IonModal;
  login: any;
  login_data: any;
  videoList: any;
  filter_data: any;
  video_form!: FormGroup;

  constructor(
    private _crud: CrudService,
    private _shared: SharedService,
    private _fb: FormBuilder,
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login)
  }

  ngOnInit() {
    this.video_form = this._fb.group({
      title: ['', Validators.required],
      url: ['', Validators.required],
    }
    )
    this._crud.get_video(this.login_data.advId).subscribe(
      (res: any) => {
        if (res.status === true) {
          this.videoList = res.data;
          this.filter_data = res.data;
        }
      },
      (err: any) => {
        console.log(err);
        this._shared.tostErrorTop('No Data')
      }
    )
  }

  onSubmit() {
    const formdata = new FormData();
    formdata.append('vakilId', this.login_data.advId);
    formdata.append('title', this.video_form.get('title')?.value);
    formdata.append('url', this.video_form.get('url')?.value);
    if (this.video_form.valid) {
      this._crud.add_video(formdata).subscribe(
        (res: any) => {
          if (res.status === true) {
            this._shared.tostSuccessTop('Video Added Successfully')
            this._crud.get_video(this.login_data.advId).subscribe(
              (res: any) => {
                if (res.status === true) {
                  this.videoList = res.data;
                }
              },
            )
            this.modal.dismiss();
          }
          else {
            this._shared.tostErrorTop('Not Add Video')
          }
        },
        (error: any) => {
          this._shared.tostErrorTop('Not Add Video')
        }
      )
    }
    else {
      this._shared.tostWrraingTop('plz all field required')
    }
  }

  AddVideo() {
    this.modal.present()
  }

  backButton() {
    this.modal.dismiss()
  }

  async copyUrl(videoUrl: string) {
    await Clipboard.write({
      string: videoUrl
    });
    this._shared.tostSuccessTop('Copied Success');
  }

  onSearch(event: any) {
    const filter = event.target.value.toLowerCase();
    this.videoList = this.filter_data.filter((data: any) =>
      data.title.toLowerCase().includes(filter) ||
      data.videoUrl.toLowerCase().includes(filter)
    );
  }
}