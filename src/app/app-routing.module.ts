import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: ForumComponent },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
