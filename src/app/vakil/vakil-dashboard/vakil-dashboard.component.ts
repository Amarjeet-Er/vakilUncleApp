import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-vakil-dashboard',
	templateUrl: './vakil-dashboard.component.html',
	styleUrls: ['./vakil-dashboard.component.scss'],
})
export class VakilDashboardComponent implements OnInit {
	dashboard: any;
	upcoming_court: any;
	recent_client: any;
	img_url: any;
	complete_case: any;
	plan_name: any;
	memberships: any;
	login: string | null;
	login_data: { advId: number } | null;
	vId: number | undefined
	profile_data: any;

	constructor(
		private _router: Router,
		private _crud: CrudService,
		private _shared: SharedService
	) {
		this.login = localStorage.getItem('vakilLoginData');
		this.login_data = this.login ? JSON.parse(this.login) : {};
		this.vId = this.login_data?.advId;

		this._shared.img_url.subscribe(
			(img_url) => {
				this.img_url = img_url;
			}
		);
	}
	ngOnInit() {
		this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
			this.loadData();
		});
	}
	loadData() {
		this._crud.get_update_vakil_profile(this.vId).subscribe(
			(res: any) => {
				if (res.status === true) {
					this.profile_data = res.data;
					console.log(this.profile_data, 'profile');
				}
			}
		);

		this._crud.get_plan_details(this.vId).subscribe(
			(res: any) => {
				this.memberships = res.data
				console.log(this.memberships);
			},
			(error) => this._shared.tostErrorTop(error)
		);

		this._crud.vakil_dashboard(this.vId).subscribe(
			(res: any) => {
				console.log(res, 'dashboard');
				
				if (res.status === true) {
					this.dashboard = res.data?.[0] || {};
				} else {
					this._shared.tostErrorTop('No Record');
				}
			},
			(error) => this._shared.tostErrorTop(error)
		);

		this._crud.get_upcoming_court_list(this.vId).subscribe(
			(res: any) => {
				if (res.status === true) {
					this.upcoming_court = res.data.slice(0, 3);
				} else {
					this._shared.tostErrorTop('No Record');
				}
			},
			(error) => this._shared.tostErrorTop(error)
		);

		this._crud.get_new_Client(this.vId).subscribe(
			(res: any) => {
				if (res.status === true) {
					this.recent_client = res.data.slice(0, 5);
				} else {
					this._shared.tostErrorTop('No Record');
				}
			},
			(error) => this._shared.tostErrorTop(error)
		);

		this._crud.get_complete_court_list(this.vId).subscribe(
			(res: any) => {
				if (res.status === true) {
					this.complete_case = res.data.slice(0, 5);
				} else {
					this._shared.tostErrorTop('No Record');
				}
			},
			(error) => this._shared.tostErrorTop(error)
		);
	}

	onUpcoming(data: any) {
		this._shared.sharedData.next(data)
		this._router.navigate(['/home/upcominghearinglist']);
	}

	handleClick(member: any) {
		switch (member?.servicePath) {
			case '/vakil/AddPublication':
				this.addPublication();
				break;
			case '/vakil/AddImageBanner':
				this.addImageBanner();
				break;
			case '/vakil/AddVideo':
				this.addVideo();
				break;
			case '/vakil/NewClientRegstration':
				this.registerNewClient();
				break;
			case '/vakil/Achievement':
				this.addachievement();
				break;
			case '/vakil/vakilRewards':
				this.addrewards();
				break;
			default:
				this.disable();
				break;
		}
	}
	registerNewClient() {
		this._router.navigate(['/home/newclientreg'])
	}
	addVideo() {
		this._router.navigate(['/home/videomanagement'])
	}
	addImageBanner() {
		this._router.navigate(['/home/imagemanagement'])
	}
	addPublication() {
		this._router.navigate(['/home/publication'])
	}
	addachievement() {
		this._router.navigate(['/home/achievementadd'])
	}
	addrewards() {
		this._router.navigate(['/home/rewardsadd'])
	}
	disable() { }
}
