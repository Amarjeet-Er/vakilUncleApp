import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientAddVakilPaymentComponent } from './client-add-vakil-payment.component';

describe('ClientAddVakilPaymentComponent', () => {
  let component: ClientAddVakilPaymentComponent;
  let fixture: ComponentFixture<ClientAddVakilPaymentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAddVakilPaymentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientAddVakilPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
