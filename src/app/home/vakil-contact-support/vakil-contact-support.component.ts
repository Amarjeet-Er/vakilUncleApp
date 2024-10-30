import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vakil-contact-support',
  templateUrl: './vakil-contact-support.component.html',
  styleUrls: ['./vakil-contact-support.component.scss'],
})
export class VakilContactSupportComponent implements OnInit {


  ngOnInit() { }

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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