import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
import { Clipboard } from '@capacitor/clipboard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  banner_select: any;
  img_url: any;

  constructor(
    private _crud: CrudService,
    private _shared: SharedService,
    private _fb: FormBuilder,
    private _router: Router,
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
    this.video_form = this._fb.group({
      title: ['', Validators.required],
      url: ['', Validators.required],
      banner: ['', Validators.required],
    }
    )
    this._crud.get_video(this.login_data.advId).subscribe(
      (res: any) => {
        console.log(res);
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
  // for select banner Card
  onBanner(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('File content:', reader.result);
        this.banner_select = file;
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
    }
  }

  onVideo(video: any) {
    console.log(video?.videoUrl, 'video');
    this._shared.sharedData.next(video?.videoUrl)
    this._router.navigate(['/home/vakilvideoplay'])
  }

  onSubmit() {
    const formdata = new FormData();
    formdata.append('vakilId', this.login_data.advId);
    formdata.append('title', this.video_form.get('title')?.value);
    formdata.append('url', this.video_form.get('url')?.value);
    formdata.append('banner', this.banner_select);
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