import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContentComponent } from './layouts/content/content.component';
import * as $ from 'jquery';
import { RestApiService } from './services/api/rest-api.service';
import { HelperService } from './services/helper/helper.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { FullWidthComponent } from './layouts/full-width/full-width.component';
import { ToastrModule } from 'ngx-toastr';
import { AdminGuard } from './guards/admin/admin.guard';
import { CashierGuard } from './guards/cashier/cashier.guard';
import { WebStorageModule } from 'ngx-store';
import { StorageService } from './services/storage/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    FullWidthComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [RestApiService, HelperService, AuthService, StorageService,
    WebStorageModule,
    AuthGuard, AdminGuard, CashierGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
