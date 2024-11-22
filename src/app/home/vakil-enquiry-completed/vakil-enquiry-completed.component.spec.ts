import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VakilEnquiryCompletedComponent } from './vakil-enquiry-completed.component';

describe('VakilEnquiryCompletedComponent', () => {
  let component: VakilEnquiryCompletedComponent;
  let fixture: ComponentFixture<VakilEnquiryCompletedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VakilEnquiryCompletedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VakilEnquiryCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
