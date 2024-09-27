import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpcomingCourtHearingListComponent } from './upcoming-court-hearing-list.component';

describe('UpcomingCourtHearingListComponent', () => {
  let component: UpcomingCourtHearingListComponent;
  let fixture: ComponentFixture<UpcomingCourtHearingListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingCourtHearingListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpcomingCourtHearingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
