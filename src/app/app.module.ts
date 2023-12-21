import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './utilities/header/header.component';
import { FooterComponent } from './utilities/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule } from '@ngxs/store';
import { HomeComponent } from './components/home/home.component';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PropertyState } from './store/property.store';
import { AgGridModule } from 'ag-grid-angular';
import { AddEditPropertyComponent } from './components/add-edit-property/add-edit-property.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserviewComponent } from './components/userview/userview.component';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { UserfavouriteComponent } from './components/userfavourite/userfavourite.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InterceptorService } from './interceptor/interceptor.service';
import { ContactusComponent } from './components/contactus/contactus.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AddEditPropertyComponent,
    UserviewComponent,
    UserfavouriteComponent,
    ContactusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgGridModule,
    NgbModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatCardModule,
    MatBadgeModule,
    MatProgressBarModule,
    NgxsModule.forRoot([PropertyState]),
    NgxsLoggerPluginModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
