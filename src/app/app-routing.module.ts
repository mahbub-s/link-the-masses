import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './views/users/users.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AvailableStudiesComponent } from './views/studies/available.component';
import { InprogressStudiesComponent } from './views/studies/inprogress.component';
import { CompleteStudiesComponent } from './views/studies/complete.component';
import { LoginComponent } from './views/login/login.component';

import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'available-studies', component: AvailableStudiesComponent, canActivate: [AuthGuard] },
  { path: 'inprogress-studies', component: InprogressStudiesComponent, canActivate: [AuthGuard] },
  { path: 'complete-studies', component: CompleteStudiesComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
