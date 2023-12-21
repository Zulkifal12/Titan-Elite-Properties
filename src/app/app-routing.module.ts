import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { patch } from '@ngxs/store/operators';
import { UserviewComponent } from './components/userview/userview.component';

import { UserfavouriteComponent } from './components/userfavourite/userfavourite.component';
import { ContactusComponent } from './components/contactus/contactus.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'userview',
    component: UserviewComponent,
  },
  {
    path: 'userfvrt',
    component: UserfavouriteComponent,
  },
  {
    path: 'contactUs',
    component: ContactusComponent,
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
