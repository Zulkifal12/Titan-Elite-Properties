import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { finalize } from 'rxjs';
import { PropertyAction } from 'src/app/store/property.action';
import {
  defaultImageUrlsubmit,
  propertyLocation,
  propertyType,
} from 'src/app/utilities/app.const';

@Component({
  selector: 'app-add-edit-property',
  templateUrl: './add-edit-property.component.html',
  styleUrls: ['./add-edit-property.component.css'],
})
export class AddEditPropertyComponent implements OnInit {
  form!: FormGroup;
  property: any;
  isDisabled = false;
  propertyType = propertyType;
  propertyLocation = propertyLocation;
  isEditable: boolean = false;
  // Inside your component class
  defaultImageUrl = 'assets/images/default-img.jpg';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditPropertyComponent>,
    private store: Store,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.form = this.getInitForm();
    this.getDataFromDialog();
    this.postFormData();
  }
  getDataFromDialog(): void {
    this.property = this.data?.data;
    this.isEditable = this.data?.isEditable;
  }
  getInitForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
      coveredAreaSQFT: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      imageUrl: new FormControl(defaultImageUrlsubmit),
      contact: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      bed: new FormControl('', Validators.required),
      bath: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      isCommercial: new FormControl(false),
      propertyType: new FormControl('', Validators.required),
      city_address: new FormControl(''),
    });
  }
  postFormData(): void {
    if (this.property) {
      this.form.patchValue({
        id: this.property.id,
        title: this.property.title,
        coveredAreaSQFT: this.property.coveredAreaSQFT,
        imageUrl: this.property.imageUrl,
        price: this.property.price,
        bed: this.property.bed,
        bath: this.property.bath,
        address: this.property.address,
        isCommercial: this.property.isCommercial,
        propertyType: this.property?.propertyType,
        city_address: this.property.city_address,
        contact: this.property.contact,
      });
    }

    if (!this.data?.isEditable) {
      this.form.disable();
    }
  }

  onsubmit() {
    if (this.property) {
      this.isEditable = true;
      this.form.enable();
      this.store
        .dispatch(new PropertyAction.updateProperty(this.form.value))
        .pipe(
          finalize(() => {
            this.store.dispatch(new PropertyAction.GetProperties());
          })
        )
        .subscribe(() => {
          this.snackBar.open('Record Updated successfully.', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close();
          this.dialog.closeAll();
        });
    } else {
      if (this.form.value) {
        this.store
          .dispatch(new PropertyAction.addProperty(this.form.value))
          .pipe(
            finalize(() => {
              this.store.dispatch(new PropertyAction.GetProperties());
            })
          )
          .subscribe(() => {
            this.snackBar.open(
              'Property add successfully. We will contact you seen.',
              'Close',
              {
                duration: 3000,
              }
            );
            this.dialogRef.close();
          });
      }
    }
  }
  openEdit(edit: boolean) {
    const dialogRef = this.dialog.open(AddEditPropertyComponent, {
      panelClass: 'view-Addsku-modal',
      data: { data: this.data.data, isEditable: edit },
    });
  }
  onDelete() {
    if (this.property) {
      this.store
        .dispatch(new PropertyAction.deleteProperty(this.property.id))
        .pipe(
          finalize(() => {
            this.store.dispatch(new PropertyAction.GetProperties());
          })
        )
        .subscribe(() => {
          this.snackBar.open('Record deleted successfully.', 'Close', {
            duration: 3000,
          });
          this.dialog.closeAll();
        });
    }
  }
  onClose(): void {
    this.dialogRef.close();
    this.dialog.closeAll();
  }
}
