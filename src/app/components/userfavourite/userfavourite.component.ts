import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/interfaces/properties';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-userfavourite',
  templateUrl: './userfavourite.component.html',
  styleUrls: ['./userfavourite.component.css'],
})
export class UserfavouriteComponent implements OnInit {
  favouritesHouses: Property[] = [];
  constructor(private commonService: CommonServiceService) {
    this.favouritesHouses = this.commonService.getFavouriteHouses();
  }
  ngOnInit(): void {}
  addToFvrt() {}
  contactOwner() {}
  removeFvrt(property: Property) {
    this.favouritesHouses = this.favouritesHouses.filter(
      (item) => item.id !== property.id
    );
    this.commonService.favouriteHouses = this.favouritesHouses;
  }
}
