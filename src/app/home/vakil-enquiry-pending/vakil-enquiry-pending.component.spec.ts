import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VakilEnquiryPendingComponent } from './vakil-enquiry-pending.component';

describe('VakilEnquiryPendingComponent', () => {
  let component: VakilEnquiryPendingComponent;
  let fixture: ComponentFixture<VakilEnquiryPendingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VakilEnquiryPendingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VakilEnquiryPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
