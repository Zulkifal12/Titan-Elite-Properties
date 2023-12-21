import { State, Selector, Action, StateContext } from '@ngxs/store';
import { PropertyStateModel } from './property.state.model';
import { Injectable } from '@angular/core';
import { PropertyAction } from './property.action';
import { PropertiesServiceService } from '../services/properties.service.service';
import { tap } from 'rxjs';
import { Property } from '../interfaces/properties';
import { propertyType } from '../utilities/app.const';

@State<PropertyStateModel>({
  name: 'property',
  defaults: new PropertyStateModel(),
})
@Injectable()
export class PropertyState {
  @Selector()
  static properties(state: PropertyStateModel) {
    return state.properties;
  }
  @Selector()
  static propertiesLoaded(state: PropertyStateModel) {
    return state.propertiesLoaded;
  }
  constructor(private propertiesService: PropertiesServiceService) {}

  @Action(PropertyAction.GetProperties)
  getAllProperties(
    ctx: StateContext<PropertyStateModel>,
    action: PropertyAction.GetProperties
  ) {
    return this.propertiesService.getProperties().pipe(
      tap((resp: Property[]) => {
        const modifiedProperties = resp.map((property) => {
          property.bath = Math.floor(Math.abs(property.bath)) % 10;
          property.bed = Math.floor(Math.abs(property.bed)) % 10;
          property.price = (parseFloat(property.price) * 100).toFixed(2);
          property.propertyType = this.getRandomPropertyType();
          property.contact = parseInt(
            property.contact.toString().padStart(11, '+929900300'),
            10
          );

          property.address = property.address.toUpperCase();
          return property;
        });
        const reversedProperties = modifiedProperties.reverse();
        ctx.patchState({
          properties: reversedProperties,
          propertiesLoaded: true,
        });
      })
    );
  }
  getRandomPropertyType(): string {
    const randomIndex = Math.floor(Math.random() * propertyType.length);
    return propertyType[randomIndex];
  }

  @Action(PropertyAction.updateProperty)
  updateProperty(
    ctx: StateContext<PropertyStateModel>,
    action: PropertyAction.updateProperty
  ) {
    return this.propertiesService.updateProperties(action.payload).pipe(
      tap((resp: Property) => {
        const properties = ctx.getState().properties;
        const index = properties.findIndex(
          (property) => property.id === action.payload.id
        );
        properties[index] = action.payload;
        ctx.patchState({
          properties: properties,
        });
      })
    );
  }

  @Action(PropertyAction.deleteProperty)
  deleteProperty(
    ctx: StateContext<PropertyStateModel>,
    action: PropertyAction.deleteProperty
  ) {
    return this.propertiesService.deleteProperty(action.payload).pipe(
      tap((resp: Property) => {
        const properties = ctx.getState().properties;
        const index = properties.findIndex(
          (property) => property.id === action.payload
        );
        properties.splice(index, 1);
        ctx.patchState({
          properties: properties,
        });
      })
    );
  }

  @Action(PropertyAction.addProperty)
  addProperty(
    ctx: StateContext<PropertyStateModel>,
    action: PropertyAction.addProperty
  ) {
    console.log('i am actioned payload', action.payload);
    return this.propertiesService.addProperty(action.payload).pipe(
      tap((resp: Property) => {
        const properties = ctx.getState().properties;
        properties.push(action.payload);
        ctx.patchState({
          properties: properties,
        });
      })
    );
  }
}
