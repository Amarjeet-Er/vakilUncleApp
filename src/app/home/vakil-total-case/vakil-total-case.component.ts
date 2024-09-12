import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface Case {
  title: string;
  lawyerName: string;
  caseNumber: string;
  mobileNumber: string;
  nextDate: string;
}

@Component({
  selector: 'app-vakil-total-case',
  templateUrl: './vakil-total-case.component.html',
  styleUrls: ['./vakil-total-case.component.scss'],
})
export class VakilTotalCaseComponent  implements OnInit {

 

  cases: Case[] = [];
  filteredCases: Case[] = [];
  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    this.cases = [
      { title: 'Property Dispute', lawyerName: 'John Doe', caseNumber: 'CN-PD1245', mobileNumber: '1234567890', nextDate: '12-Aug-2023 11:00AM' },
      { title: 'Contract Violation', lawyerName: 'Jane Smith', caseNumber: 'CN-CV6789', mobileNumber: '2345678901', nextDate: '15-Sep-2023 09:30AM' },
      { title: 'Employment Issue', lawyerName: 'Alice Johnson', caseNumber: 'CN-EI3421', mobileNumber: '3456789012', nextDate: '20-Jul-2023 10:00AM' },
      { title: 'Personal Injury', lawyerName: 'Bob Brown', caseNumber: 'CN-PI0987', mobileNumber: '4567890123', nextDate: '25-Aug-2023 02:00PM' },
      { title: 'Divorce Settlement', lawyerName: 'Carol White', caseNumber: 'CN-DS5678', mobileNumber: '5678901234', nextDate: '30-Jul-2023 03:00PM' },
      { title: 'Property Transfer', lawyerName: 'David Green', caseNumber: 'CN-PT7890', mobileNumber: '6789012345', nextDate: '05-Aug-2023 12:00PM' },
      { title: 'Debt Recovery', lawyerName: 'Eva Black', caseNumber: 'CN-DR2345', mobileNumber: '7890123456', nextDate: '10-Sep-2023 01:00PM' },
      { title: 'Intellectual Property', lawyerName: 'Frank Blue', caseNumber: 'CN-IP9876', mobileNumber: '8901234567', nextDate: '15-Aug-2023 04:00PM' },
      { title: 'Tenant Dispute', lawyerName: 'Grace Yellow', caseNumber: 'CN-TD4567', mobileNumber: '9012345678', nextDate: '20-Jul-2023 11:30AM' },
      { title: 'Fraud Investigation', lawyerName: 'Harry Red', caseNumber: 'CN-FI1234', mobileNumber: '0123456789', nextDate: '25-Aug-2023 09:00AM' }
    ];

    this.filteredCases = this.cases;
  }



  onSearchChange(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredCases = this.cases.filter(caseItem =>
      Object.values(caseItem).some(value =>
        value.toString().toLowerCase().includes(searchTerm)
      )
    );
  }



  // for modal 
  caseHearing() {
    this._router.navigate(['/home/casehearing'])
  }

}
