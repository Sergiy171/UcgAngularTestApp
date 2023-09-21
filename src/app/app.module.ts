import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { PageNotFoundComponent } from './components/falback/page-not-found/page-not-found.component';
import { ForbiddenComponent } from './components/falback/forbidden/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserViewComponent,
    PageNotFoundComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
