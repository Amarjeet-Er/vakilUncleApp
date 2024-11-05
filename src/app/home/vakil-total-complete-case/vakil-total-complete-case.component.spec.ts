import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VakilTotalCompleteCaseComponent } from './vakil-total-complete-case.component';

describe('VakilTotalCompleteCaseComponent', () => {
  let component: VakilTotalCompleteCaseComponent;
  let fixture: ComponentFixture<VakilTotalCompleteCaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VakilTotalCompleteCaseComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VakilTotalCompleteCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
