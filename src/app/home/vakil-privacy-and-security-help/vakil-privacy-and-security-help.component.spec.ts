import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VakilPrivacyAndSecurityHelpComponent } from './vakil-privacy-and-security-help.component';

describe('VakilPrivacyAndSecurityHelpComponent', () => {
  let component: VakilPrivacyAndSecurityHelpComponent;
  let fixture: ComponentFixture<VakilPrivacyAndSecurityHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VakilPrivacyAndSecurityHelpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VakilPrivacyAndSecurityHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
