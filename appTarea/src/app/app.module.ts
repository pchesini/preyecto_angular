import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';

import { routes } from './app.routes';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LabsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
    //RouterModule.forChild(childRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
