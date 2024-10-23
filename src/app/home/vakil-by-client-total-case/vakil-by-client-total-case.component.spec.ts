import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VakilByClientTotalCaseComponent } from './vakil-by-client-total-case.component';

describe('VakilByClientTotalCaseComponent', () => {
  let component: VakilByClientTotalCaseComponent;
  let fixture: ComponentFixture<VakilByClientTotalCaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VakilByClientTotalCaseComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VakilByClientTotalCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
