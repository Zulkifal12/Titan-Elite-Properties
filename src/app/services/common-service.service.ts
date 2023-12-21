import { Injectable } from '@angular/core';
import { Property } from '../interfaces/properties';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  constructor() {}
  public favouriteHouses: Property[] = [];
  getFavouriteHouses() {
    return this.favouriteHouses;
  }
}
