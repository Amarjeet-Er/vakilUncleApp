import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-client-case',
  templateUrl: './add-client-case.component.html',
  styleUrls: ['./add-client-case.component.scss'],
})
export class AddClientCaseComponent implements OnInit {
  members: { name: string, details: string }[] = [];

  constructor() { }

  ngOnInit() { }

  addMember() {
    this.members.push({ name: '', details: '' });
  }

  removeMember(index: number) {
    this.members.splice(index, 1);
  }
}
