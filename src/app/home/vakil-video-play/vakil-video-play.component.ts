import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-vakil-video-play',
  templateUrl: './vakil-video-play.component.html',
  styleUrls: ['./vakil-video-play.component.scss'],
})
export class VakilVideoPlayComponent  implements OnInit {

  video_url: SafeResourceUrl | undefined;

  constructor(
    private _shared: SharedService,
    private _sanitizer: DomSanitizer,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._shared.sharedData.subscribe((res: any) => {
      console.log(res);
      this.video_url = this._sanitizer.bypassSecurityTrustResourceUrl(res);
    });
  }

  // ngOnDestroy() {
  //   this._shared.sharedData.unsubscribe();
  // }

  onBcak(){
    this._router.navigate(['/home/videomanagement'])
  }
}
