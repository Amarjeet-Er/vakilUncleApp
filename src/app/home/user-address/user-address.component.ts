import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
})
export class UserAddressComponent implements OnInit {
  locationDetails1: any = {};
  locationDetails: any = {};

  constructor(
    private locationService: CrudService,
  ) { }

  ngOnInit(): void {

  }

  async onLocationOpen() {
    // try {
    //   const coordinates = await this.locationService.getCurrentPosition();
    //   const lat = coordinates.coords.latitude;
    //   const lon = coordinates.coords.longitude;
    //   const response: any = await this.locationService.getDetailedLocation(lat, lon);
    //   console.log(response);
    //   this.locationDetails = {
    //     village: (response.address.city || '') + ', ' + (response.address.suburb || '') + ', ' + (response.address.town || '') || 'N/A',
    //     district: response.address.district || response.address.state_district || 'N/A',
    //     state: response.address.state || 'N/A',
    //     country: response.address.country || 'N/A',
    //     pinCode: response.address.postcode || 'N/A',
    //   };
    //   console.log("Response:", this.locationDetails);
    //   const addressComponents = response.display_name.split(", ");
    //   this.locationDetails1 = {
    //     village1: (addressComponents[0] || '') + ', ' + (addressComponents[1] || '') + ', ' + (addressComponents[2] || ''),
    //     district1: addressComponents[3],
    //     state1: addressComponents[4],
    //     country1: addressComponents[6],
    //     pinCode1: addressComponents[5],
    //   }
    //   console.log("Split:", this.locationDetails1);
    // } catch (error) {
    //   console.error('Error getting location', error);
    //   this.locationDetails = {
    //     pinCode: 'Error',
    //     village: 'Error',
    //     state: 'Error',
    //     district: 'Error',
    //     country: 'Error',
    //   };
    // }
  }
}