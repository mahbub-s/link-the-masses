import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './views/users/users.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AvailableStudiesComponent } from './views/studies/available.component';


const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'available-studies', component: AvailableStudiesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
