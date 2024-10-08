import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
	selector: 'app-vakil-dashboard',
	templateUrl: './vakil-dashboard.component.html',
	styleUrls: ['./vakil-dashboard.component.scss'],
})
export class VakilDashboardComponent implements OnInit {
	chartOptions = {
		animationEnabled: true,
		theme: "light2",
		title: {
			text: "Daily Visitors"
		},
		axisX: {
			valueFormatString: "DD MMM",
			crosshair: {
				enabled: true,
				snapToDataPoint: true
			}
		},
		axisY: {
			title: "Number of Visits",
			crosshair: {
				enabled: true
			}
		},
		toolTip: {
			shared: true
		},
		legend: {
			cursor: "pointer",
			verticalAlign: "bottom",
			horizontalAlign: "right",
			dockInsidePlotArea: true,
			itemclick: function (e: any) {
				if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				} else {
					e.dataSeries.visible = true;
				}
				e.chart.render();
			}
		},
		data: [{
			type: "line",
			showInLegend: true,
			name: "Total Visit",
			lineDashType: "dash",
			markerType: "square",
			xValueFormatString: "DD MMM, YYYY",
			dataPoints: [
				{ x: new Date(2022, 0, 3), y: 650 },
				{ x: new Date(2022, 0, 4), y: 700 },
				{ x: new Date(2022, 0, 5), y: 710 },
				{ x: new Date(2022, 0, 6), y: 658 },
				{ x: new Date(2022, 0, 7), y: 734 },
				{ x: new Date(2022, 0, 8), y: 963 },
				{ x: new Date(2022, 0, 9), y: 847 },
				{ x: new Date(2022, 0, 10), y: 853 },
				{ x: new Date(2022, 0, 11), y: 869 },
				{ x: new Date(2022, 0, 12), y: 943 },
				{ x: new Date(2022, 0, 13), y: 970 },
				{ x: new Date(2022, 0, 14), y: 869 },
				{ x: new Date(2022, 0, 15), y: 890 },
				{ x: new Date(2022, 0, 16), y: 930 }
			]
		},
		{
			type: "line",
			showInLegend: true,
			name: "Unique Visit",
			lineDashType: "dot",
			dataPoints: [
				{ x: new Date(2022, 0, 3), y: 510 },
				{ x: new Date(2022, 0, 4), y: 560 },
				{ x: new Date(2022, 0, 5), y: 540 },
				{ x: new Date(2022, 0, 6), y: 558 },
				{ x: new Date(2022, 0, 7), y: 544 },
				{ x: new Date(2022, 0, 8), y: 693 },
				{ x: new Date(2022, 0, 9), y: 657 },
				{ x: new Date(2022, 0, 10), y: 663 },
				{ x: new Date(2022, 0, 11), y: 639 },
				{ x: new Date(2022, 0, 12), y: 673 },
				{ x: new Date(2022, 0, 13), y: 660 },
				{ x: new Date(2022, 0, 14), y: 562 },
				{ x: new Date(2022, 0, 15), y: 643 },
				{ x: new Date(2022, 0, 16), y: 570 }
			]
		}]
	};
	login: any;
	login_data: any;
	vId: any;
	dashboard: any;
	upcoming_court: any;
	recent_client: any;
	img_url: any;
	complete_case: any;
	plan_name: any;
	memberships: any;

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
	disable() { }
	ngOnInit() {
		this._crud.get_plan_details(this.vId).subscribe(
			(res: any) => {
				this.memberships = res.data
				console.log(this.memberships);

			},
			(error) => this._shared.tostErrorTop('Error')
		);

		this._crud.vakil_dashboard(this.vId).subscribe(
			(res: any) => {
				if (res.status === true) {
					this.dashboard = res.data?.[0] || {};
				} else {
					this._shared.tostErrorTop('Error');
				}
			},
			(error) => this._shared.tostErrorTop('Error')
		);

		this._crud.get_upcoming_court_list(this.vId).subscribe(
			(res: any) => {
				if (res.status === true) {
					this.upcoming_court = res.data.slice(0, 3);
				} else {
					this._shared.tostErrorTop('Error');
				}
			},
			(error) => this._shared.tostErrorTop('Error')
		);

		this._crud.get_new_Client(this.vId).subscribe(
			(res: any) => {
				if (res.status === true) {
					this.recent_client = res.data.slice(0, 5);
				} else {
					this._shared.tostErrorTop('Error');
				}
			},
			(error) => this._shared.tostErrorTop('Error')
		);

		this._crud.get_complete_court_list(this.vId).subscribe(
			(res: any) => {
				if (res.status === true) {
					this.complete_case = res.data.slice(0, 5);
				} else {
					this._shared.tostErrorTop('Error');
				}
			},
			(error) => this._shared.tostErrorTop('Error')
		);
	}

	onCompleteCase(data: any) {
		this._shared.sharedData.next(data);
		this._router.navigate(['/home/completecasedetails']);
	}

	onUpcoming(data: any) {
		localStorage.setItem('CaseHearingNo', JSON.stringify(data));
		this._router.navigate(['/home/upcominghearinglist']);
	}

	handleClick(member: any) {
		switch (member?.servicePath) {
			case '/vakil/addPublication':
				this.addPublication();
				break;
			case '/vakil/AddImageBanner':
				this.addImageBanner();
				break;
			case '/vakil/addVideo':
				this.addVideo();
				break;
			case '/vakil/NewClientRegstration':
				this.registerNewClient();
				break;
			default:
				this.disable();
				break;
		}
	}
	registerNewClient() {
		this._router.navigate(['/vakil/home/newclientreg'])
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
}
