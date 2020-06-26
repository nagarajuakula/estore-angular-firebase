import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component'; 
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import * as fromAppReducer from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    // Initialize Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig, "fireBaseEStore"),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
    Ng2SearchPipeModule,
    StoreModule.forRoot(fromAppReducer.appReducer)
  ],
  providers: [
  //   {
  //   provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true
  // }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
