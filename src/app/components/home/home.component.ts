import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Select, Store } from '@ngxs/store';
import { ColDef, ColGroupDef, RowGroupingDisplayType } from 'ag-grid-community';
import { Observable, Subscription } from 'rxjs';
import { Property } from 'src/app/interfaces/properties';

import { PropertyAction } from 'src/app/store/property.action';
import { PropertyState } from 'src/app/store/property.store';
import { AddEditPropertyComponent } from '../add-edit-property/add-edit-property.component';
import 'ag-grid-enterprise';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @Select(PropertyState.properties) properties$!: Observable<Property[]>;
  @Select(PropertyState.propertiesLoaded)
  propertiesLoaded$!: Observable<boolean>;
  propertiesLoaded: Subscription = new Subscription();

  isEditable: boolean = false;
  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getProperties();
  }

  getProperties() {
    this.propertiesLoaded = this.propertiesLoaded$.subscribe((resp) => {
      if (!resp) {
        this.store.dispatch(new PropertyAction.GetProperties());
      }
    });
  }

  public columnsDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Owner Name',
      field: 'title',
      enableRowGroup: true,
      cellRenderer: 'agGroupCellRenderer',
    },
    {
      headerName: 'Beds',
      field: 'bed',
      enableRowGroup: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Baths',
      field: 'bath',
      enableRowGroup: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Area (SQFT)',
      field: 'coveredAreaSQFT',
      enableRowGroup: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Price',
      enableRowGroup: false,
      field: 'price',
    },
    {
      headerName: 'Contact',
      enableRowGroup: false,
      field: 'contact',
    },
    {
      headerName: 'Address',
      children: [
        {
          headerName: 'Street',
          field: 'city_address',
        },
        {
          headerName: 'Direction',
          enableRowGroup: true,
          filter: true,
          floatingFilter: true,
          field: 'address',
        },
      ],
    },
    {
      headerName: 'Image',
      cellRenderer: this.instructorImageRenderer,
    },
  ];

  public groupDisplayType: RowGroupingDisplayType = 'multipleColumns';

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
  };

  onRowSelected(event: any) {
    const dialogRef = this.dialog.open(AddEditPropertyComponent, {
      panelClass: 'view-Addsku-modal',
      data: { data: event.data, isEditable: this.isEditable },
    });
  }
  instructorImageRenderer(params: any) {
    if (params?.data?.imageUrl) {
      const imageUrl = `${params?.data?.imageUrl}`;
      return `
        <img src="${imageUrl}" style="width: 50px; height: auto;" />
            `;
    }
    return '-';
  }

  ngOnDestroy(): void {
    this.propertiesLoaded.unsubscribe();
  }
}
