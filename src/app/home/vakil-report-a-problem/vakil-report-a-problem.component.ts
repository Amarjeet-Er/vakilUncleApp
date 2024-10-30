import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vakil-report-a-problem',
  templateUrl: './vakil-report-a-problem.component.html',
  styleUrls: ['./vakil-report-a-problem.component.scss'],
})
export class VakilReportAProblemComponent  implements OnInit {

  ngOnInit() { }

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  setTouched(controlName: string) {
    this.contactForm.get(controlName)?.markAsTouched();
  }

  submitSupportRequest() {
    if (this.contactForm.valid) {
      const supportData = this.contactForm.value;
      console.log('Support Request:', supportData);
      // Add API call here if needed
    }
  }
}