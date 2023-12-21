import { State } from '@ngxs/store';
import { Property } from '../interfaces/properties';
import { Injectable } from '@angular/core';

export class PropertyStateModel {
  properties: Property[] = [];
  propertiesLoaded: boolean = false;
}

// Add a closing parenthesis here
