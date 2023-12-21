import { State } from '@ngxs/store';
import { Property } from '../interfaces/properties';
import { Injectable } from '@angular/core';

//Store state for properties
export class PropertyStateModel {
  properties: Property[] = [];
  propertiesLoaded: boolean = false;
}
