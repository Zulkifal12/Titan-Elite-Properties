import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Property } from 'src/app/interfaces/properties';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { PropertyAction } from 'src/app/store/property.action';
import { PropertyState } from 'src/app/store/property.store';
import { propertyLocation, propertyType } from 'src/app/utilities/app.const';
import { AddEditPropertyComponent } from '../add-edit-property/add-edit-property.component';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css'],
})
export class UserviewComponent implements OnInit {
  private unsubscribe$ = new Subject();
  @Select(PropertyState.properties) properties$!: Observable<Property[]>;
  originalProperties: Property[] = [];
  orignalPropertiesCopy: Property[] = [];
  selectedValue!: UntypedFormControl;
  selectedLocation!: UntypedFormControl;
  propertyTypes = propertyType;
  propertyLocation = propertyLocation;
  isButtonSelected = false;
  constructor(
    private store: Store,
    public dialog: MatDialog,
    public commonService: CommonServiceService
  ) {
    this.store.dispatch(new PropertyAction.GetProperties());
  }
  ngOnInit(): void {
    this.getRefresh();
    this.selectedLocation = new UntypedFormControl('');
    this.selectedValue = new UntypedFormControl('');

    //Filitring properties based on property type
    this.selectedValue.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (this.selectedValue.value !== '0') {
          const filteredProperties = this.orignalPropertiesCopy.filter(
            (property: Property) => {
              if (property.propertyType === this.selectedValue.value) {
                return property;
              }
              return;
            }
          );
          this.originalProperties = filteredProperties;
        } else {
          this.originalProperties = this.orignalPropertiesCopy;
        }
      });
    //Filitring properties based on property location
    this.selectedLocation.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (this.selectedLocation.value !== '0') {
          const filteredProperties = this.orignalPropertiesCopy.filter(
            (property: Property) => {
              if (
                property.address === this.selectedLocation.value.toUpperCase()
              ) {
                return property;
              }
              return;
            }
          );
          this.originalProperties = filteredProperties;
        } else {
          this.originalProperties = this.orignalPropertiesCopy;
        }
      });
  }
  addToFvrt(property: Property) {
    const propertyId = property.id;

    const propertyExists = this.commonService.favouriteHouses.some(
      (item) => item.id === propertyId
    );

    if (!propertyExists) {
      this.commonService.favouriteHouses.push(property);
    }
  }

  toggleButton() {
    this.isButtonSelected = !this.isButtonSelected;
    if (this.isButtonSelected) {
      const filteredProperties = this.orignalPropertiesCopy.filter(
        (property: Property) => {
          if (property.isCommercial) {
            return property;
          }
          return;
        }
      );
      this.originalProperties = filteredProperties;
    } else {
      const filteredProperties = this.orignalPropertiesCopy.filter(
        (property: Property) => {
          if (!property.isCommercial) {
            return property;
          }
          return;
        }
      );
      this.originalProperties = filteredProperties;
    }
  }
  refresh() {
    this.store.dispatch(new PropertyAction.GetProperties());
    this.commonService.favouriteHouses = [];
    this.getRefresh();
  }
  getRefresh() {
    this.properties$.subscribe((resp) => {
      this.originalProperties = resp;
      this.orignalPropertiesCopy = resp;
    });
  }
  sellProperty() {
    const dialogRef = this.dialog.open(AddEditPropertyComponent, {
      panelClass: 'view-Addsku-modal',
      data: { isEditable: true },
    });
  }
  ngOnDestroy() {
    this.unsubscribe$.next('');
    this.unsubscribe$.complete();
  }
}
