import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { filter } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  slider_data: any;
  top_Lawyers: any;
  kanoon_list: any;
  Lawyers_types: any;
  nearest_Lawyers: any;
  top_properity: any;
  top_text: any;
  top_criminal: any;
  top_business_corporate: any;
  top_civil: any;
  top_family: any;
  top_motor_accident: any;
  top_divorce: any;
  top_consumer_court: any;
  top_cheque_bounce: any;

  placeholderTexts: string[] = ['"Top Lawyer"', '"Courts Name"', '"Lawyer Name"', '"City Name"'];
  currentPlaceholder: string = this.placeholderTexts[0];
  placeholderIndex: number = 0;
  intervalId: any;
  img_url: any;
  login_data: any;

  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService
  ) {
    const login = localStorage.getItem('userLoginData');
    this.login_data = login ? JSON.parse(login) : null;

    this._shared.img_url.subscribe((res: any) => {
      this.img_url = res;
    });
  }

  ngOnInit(): void {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });
    this.startPlaceholderRotation();
  }

  loadData() {
    const banner$ = this._crud.get_banner_slide();
    const topLawyers$ = this._crud.get_top_advocated();
    const nearestLawyers$ = this._crud.get_nearest_lawyer(this.login_data.id);
    const kanoonList$ = this._crud.get_kanoon_advocate();
    const lawyerTypes$ = this._crud.get_advocate_type();

    const lawyerRequests = {
      top_properity: this._crud.top_properity_lawyer(),
      top_text: this._crud.top_text_lawyer(),
      top_criminal: this._crud.top_criminal_lawyer(),
      top_business_corporate: this._crud.top_business_corporate_lawyer(),
      top_civil: this._crud.top_civil_lawyer(),
      top_family: this._crud.top_family_lawyer(),
      top_motor_accident: this._crud.top_motor_accident_lawyer(),
      top_divorce: this._crud.top_divorce_lawyer(),
      top_consumer_court: this._crud.top_consumer_court_lawyer(),
      top_cheque_bounce: this._crud.top_cheque_bounce_lawyer(),
    };

    forkJoin({
      banner: banner$,
      topLawyers: topLawyers$,
      nearestLawyers: nearestLawyers$,
      kanoonList: kanoonList$,
      lawyerTypes: lawyerTypes$,
      ...lawyerRequests
    }).subscribe(
      (responses) => {
        this.slider_data = responses.banner.data;
        this.top_Lawyers = responses.topLawyers.status ? responses.topLawyers.data : this.showError('No Record Found for Top Lawyers');
        this.nearest_Lawyers = responses.nearestLawyers.status ? responses.nearestLawyers.data : this.showError('No Record Found for Nearest Lawyers');
        this.kanoon_list = responses.kanoonList.status ? responses.kanoonList.data : this.showError('No Record Found for Kanoon List');

        const LawyerTypes = this.getLawyerIcons();
        this.Lawyers_types = responses.lawyerTypes.status ?
          responses.lawyerTypes.data.map((lawyer: any, index: any) => ({
            ...lawyer,
            icon: LawyerTypes[index]?.icon || ''
          })) :
          this.showError('No Record Found for Lawyer Types');

        this.top_properity = responses.top_properity.status ? responses.top_properity.data : this.showError('No Record Found for Top Properity Lawyers');
        this.top_text = responses.top_text.status ? responses.top_text.data : this.showError('No Record Found for Top Text Lawyers');
        this.top_criminal = responses.top_criminal.status ? responses.top_criminal.data : this.showError('No Record Found for Top Criminal Lawyers');
        this.top_business_corporate = responses.top_business_corporate.status ? responses.top_business_corporate.data : this.showError('No Record Found for Top Business Corporate Lawyers');
        this.top_civil = responses.top_civil.status ? responses.top_civil.data : this.showError('No Record Found for Top Civil Lawyers');
        this.top_family = responses.top_family.status ? responses.top_family.data : this.showError('No Record Found for Top Family Lawyers');
        this.top_motor_accident = responses.top_motor_accident.status ? responses.top_motor_accident.data : this.showError('No Record Found for Top Motor Accident Lawyers');
        this.top_divorce = responses.top_divorce.status ? responses.top_divorce.data : this.showError('No Record Found for Top Divorce Lawyers');
        this.top_consumer_court = responses.top_consumer_court.status ? responses.top_consumer_court.data : this.showError('No Record Found for Top Consumer Court Lawyers');
        this.top_cheque_bounce = responses.top_cheque_bounce.status ? responses.top_cheque_bounce.data : this.showError('No Record Found for Top Cheque Bounce Lawyers');
      },
      (error) => {
        console.error('Error loading data', error);
      }
    );
  }

  showError(message: string) {
    this._shared.tostErrorTop(message);
    return [];
  }

  getLawyerIcons() {
    return [
      { icon: '../../../assets/menuIcon/civil_lawyer.png' },
      { icon: '../../../assets/menuIcon/motor_accident_lawyer.png' },
      { icon: '../../../assets/menuIcon/criminal_lawyer.png' },
      { icon: '../../../assets/menuIcon/civil_lawyer.png' },
      { icon: '../../../assets/menuIcon/motor_accident_lawyer.png' },
      { icon: '../../../assets/menuIcon/criminal_lawyer.png' },
      { icon: '../../../assets/menuIcon/property_lawyer.png' },
      { icon: '../../../assets/menuIcon/divorce_lawyer.png' },
      { icon: '../../../assets/menuIcon/cheque_bounce_lawyer.png' },
      { icon: '../../../assets/menuIcon/tax_lawyer.png' },
      { icon: '../../../assets/menuIcon/consumer_court_lawyer.png' },
      { icon: '../../../assets/menuIcon/civil_lawyer.png' },
      { icon: '../../../assets/menuIcon/motor_accident_lawyer.png' },
      { icon: '../../../assets/menuIcon/criminal_lawyer.png' },
      { icon: '../../../assets/menuIcon/property_lawyer.png' },
      { icon: '../../../assets/menuIcon/divorce_lawyer.png' },
      { icon: '../../../assets/menuIcon/cheque_bounce_lawyer.png' },
      { icon: '../../../assets/menuIcon/tax_lawyer.png' },
      { icon: '../../../assets/menuIcon/consumer_court_lawyer.png' },
      { icon: '../../../assets/menuIcon/civil_lawyer.png' },
      { icon: '../../../assets/menuIcon/motor_accident_lawyer.png' },
      { icon: '../../../assets/menuIcon/criminal_lawyer.png' },
      { icon: '../../../assets/menuIcon/property_lawyer.png' },
      { icon: '../../../assets/menuIcon/divorce_lawyer.png' },
      { icon: '../../../assets/menuIcon/cheque_bounce_lawyer.png' },
      { icon: '../../../assets/menuIcon/tax_lawyer.png' },
      { icon: '../../../assets/menuIcon/consumer_court_lawyer.png' },
      { icon: '../../../assets/menuIcon/civil_lawyer.png' },
      { icon: '../../../assets/menuIcon/motor_accident_lawyer.png' },
      { icon: '../../../assets/menuIcon/criminal_lawyer.png' },
      { icon: '../../../assets/menuIcon/property_lawyer.png' },
      { icon: '../../../assets/menuIcon/divorce_lawyer.png' },
      { icon: '../../../assets/menuIcon/cheque_bounce_lawyer.png' },
      { icon: '../../../assets/menuIcon/tax_lawyer.png' },
      { icon: '../../../assets/menuIcon/consumer_court_lawyer.png' },
      { icon: '../../../assets/menuIcon/civil_lawyer.png' },
      { icon: '../../../assets/menuIcon/motor_accident_lawyer.png' },
      { icon: '../../../assets/menuIcon/criminal_lawyer.png' },
      { icon: '../../../assets/menuIcon/property_lawyer.png' },
      { icon: '../../../assets/menuIcon/divorce_lawyer.png' },
      { icon: '../../../assets/menuIcon/cheque_bounce_lawyer.png' },
      { icon: '../../../assets/menuIcon/tax_lawyer.png' },
      { icon: '../../../assets/menuIcon/consumer_court_lawyer.png' },
      { icon: '../../../assets/menuIcon/civil_lawyer.png' },
      { icon: '../../../assets/menuIcon/motor_accident_lawyer.png' },
      { icon: '../../../assets/menuIcon/criminal_lawyer.png' },
      { icon: '../../../assets/menuIcon/property_lawyer.png' },
      { icon: '../../../assets/menuIcon/divorce_lawyer.png' },
      { icon: '../../../assets/menuIcon/cheque_bounce_lawyer.png' },
      { icon: '../../../assets/menuIcon/tax_lawyer.png' },
      { icon: '../../../assets/menuIcon/consumer_court_lawyer.png' },
      { icon: '../../../assets/menuIcon/civil_lawyer.png' },
      { icon: '../../../assets/menuIcon/motor_accident_lawyer.png' },
      { icon: '../../../assets/menuIcon/criminal_lawyer.png' },
      { icon: '../../../assets/menuIcon/property_lawyer.png' },
      { icon: '../../../assets/menuIcon/divorce_lawyer.png' },
      { icon: '../../../assets/menuIcon/cheque_bounce_lawyer.png' },
      { icon: '../../../assets/menuIcon/tax_lawyer.png' },
      { icon: '../../../assets/menuIcon/consumer_court_lawyer.png' },
      { icon: '../../../assets/menuIcon/civil_lawyer.png' },
      { icon: '../../../assets/menuIcon/motor_accident_lawyer.png' },
      { icon: '../../../assets/menuIcon/criminal_lawyer.png' },
      { icon: '../../../assets/menuIcon/property_lawyer.png' },
      { icon: '../../../assets/menuIcon/divorce_lawyer.png' },
      { icon: '../../../assets/menuIcon/cheque_bounce_lawyer.png' },
      { icon: '../../../assets/menuIcon/tax_lawyer.png' },
      { icon: '../../../assets/menuIcon/consumer_court_lawyer.png' },
    ];
  }

  startPlaceholderRotation() {
    this.intervalId = setInterval(() => {
      this.placeholderIndex = (this.placeholderIndex + 1) % this.placeholderTexts.length;
      this.currentPlaceholder = this.placeholderTexts[this.placeholderIndex];
    }, 3000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  searchPage() {
    this._router.navigate(['/home/search']);
  }

  allKanoon() {
    this._router.navigate(['/home/kanoonlist']);
  }
  kanoot_id(kanoon:any) {
    console.log(kanoon);  
    this._shared.sharedData.next(kanoon)  
    this._router.navigate(['/home/ipc']);
  }

  see_All(data: any) {
    this._shared.sharedData.next(data);
    this._router.navigate(['/home/changelwayerslist']);
  }

  advocate_Profile(data: any) {
    localStorage.setItem('vakilProfile', JSON.stringify(data.advId));
    this._router.navigate(['/home/advocateportfolio']);
  }

  filterAdvocate(data: any) {
    this._shared.sharedData.next(data);
    this._router.navigate(['/user/home/advocate']);
  }

  robotChat() {
    this._router.navigate(['/home/robotchat']);
  }
}
