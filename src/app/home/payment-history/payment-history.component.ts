import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
})
export class PaymentHistoryComponent  implements OnInit {
  // payments = [
  //   {
  //     vakilId: 0,
  //     userId: null,
  //     orderId: 'or@12345',
  //     paymentId: '123#pId',
  //     featureId: 0,
  //     paymentDescription: '',
  //     paymentMode: 'UPI',
  //     paymentStatus: 1,
  //     price: 2000,
  //     planName: 'Platinum',
  //     advocateName: 'Brijesh',
  //     advocateEmail: 'brijesh@gmail.com',
  //     paymentDate: '19-09-2024',
  //   },
  // ]  
  login:any;
  login_data:any;
  pay_history: any;
  constructor(
    private _crud:CrudService,
  ) { 
    this.login=localStorage.getItem('vakilLoginData');
    this.login_data=JSON.parse(this.login)
  }

  ngOnInit() {
    this._crud.get_pay_history(this.login_data.advId).subscribe(
      (res:any)=>{
        console.log(res);
        if(res.status===true){
          this.pay_history=res.data
        }
      }
    )
  }
}
