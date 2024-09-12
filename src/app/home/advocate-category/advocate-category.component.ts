import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advocate-category',
  templateUrl: './advocate-category.component.html',
  styleUrls: ['./advocate-category.component.scss'],
})
export class AdvocateCategoryComponent implements OnInit {
  categories: any;

  constructor(
    private _router:Router
  ) {
    this.categories = [
      {
        title: 'Corporate Law',
        lawyers: [
          { imgSrc: '../../../assets/menuIcon/tax_lawyer.png', name: 'Tax Lawyer' },
          { imgSrc: '../../../assets/menuIcon/gst_lawyer.png', name: 'GST Lawyer' },
          { imgSrc: '../../../assets/menuIcon/corporate_lawyer.png', name: 'Business / Corporate Lawyer' },
          { imgSrc: '../../../assets/menuIcon/bankruptcy.png', name: 'Bankruptcy Lawyer' },
          { imgSrc: '../../../assets/menuIcon/finance.png', name: 'Banking / Finance Lawyer' },
          { imgSrc: '../../../assets/menuIcon/copyright.png', name: 'Trademark & Copyright' },
          { imgSrc: '../../../assets/menuIcon/customs_central_excise.png', name: 'Customs & Central Excise' },
        ]
      },
      {
        title: 'Personal / Family',
        lawyers: [
          { imgSrc: '../../../assets/menuIcon/divorce_lawyer.png', name: 'Divorce' },
          { imgSrc: '../../../assets/menuIcon/family_dispute.png', name: 'Family Dispute' },
          { imgSrc: '../../../assets/menuIcon/muslim_law.png', name: 'Muslim Law' },
          { imgSrc: '../../../assets/menuIcon/child_custody.png', name: 'Child Custody' },
          { imgSrc: '../../../assets/menuIcon/domestic_violence.png', name: 'Domestic Violence' },
          { imgSrc: '../../../assets/menuIcon/motor_accident_lawyer.png', name: 'Motor Accident' },
          { imgSrc: '../../../assets/menuIcon/labour_service.png', name: 'Labour & Service' },
        ]
      },
      {
        title: 'Criminal / Property',
        lawyers: [
          { imgSrc: '../../../assets/menuIcon/criminal_lawyer.png', name: 'Criminal' },
          { imgSrc: '../../../assets/menuIcon/property_lawyer.png', name: 'Property' },
          { imgSrc: '../../../assets/menuIcon/landlord.png', name: 'Landlord / Tenant' },
          { imgSrc: '../../../assets/menuIcon/cyber_crime.png', name: 'Cyber Crime' },
        ]
      },
      {
        title: 'Civil / Debt Matters',
        lawyers: [
          { imgSrc: '../../../assets/menuIcon/civil_lawyer.png', name: 'Civil' },
          { imgSrc: '../../../assets/menuIcon/cheque_bounce_lawyer.png', name: 'Cheque Bounce' },
          { imgSrc: '../../../assets/menuIcon/consumer_court_lawyer.png', name: 'Consumer Court' },
          { imgSrc: '../../../assets/menuIcon/documents.png', name: 'Documentation' },
          { imgSrc: '../../../assets/menuIcon/recovery.png', name: 'Recovery' },
        ]
      },
      {
        title: 'Others',
        lawyers: [
          { imgSrc: '../../../assets/menuIcon/judge.png', name: 'Supreme Court' },
          { imgSrc: '../../../assets/menuIcon/armed_forces.png', name: 'Armed Forces Tribunal' },
          { imgSrc: '../../../assets/menuIcon/medical.png', name: 'Insurance' },
          { imgSrc: '../../../assets/menuIcon/passport.png', name: 'Immigration' },
          { imgSrc: '../../../assets/menuIcon/international_law.png', name: 'International Law' },
        ]
      },
      {
        title: 'Others Links',
        lawyers: [
          { imgSrc: '../../../assets/menuIcon/lawyer.png', name: 'Top Lawyer' },
          { imgSrc: '../../../assets/menuIcon/city_lawyer.png', name: 'City Laywer' },
          { imgSrc: '../../../assets/menuIcon/rti.png', name: 'RTI' },
          { imgSrc: '../../../assets/menuIcon/ipc.png', name: 'IPC' },
          { imgSrc: '../../../assets/menuIcon/constitution.png', name: 'Constitution' }
        ]
      },
     
      // Add more categories here if needed
    ];
  }

  ngOnInit() { }


  filterAdvocate(){
    this._router.navigate(['/home/filteradvocate'])
  }
}
