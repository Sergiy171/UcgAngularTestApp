import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { PageNotFoundComponent } from './components/falback/page-not-found/page-not-found.component';
import { ForbiddenComponent } from './components/falback/forbidden/forbidden.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: UserListComponent },
  { path: 'user/:userId', component: UserViewComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
