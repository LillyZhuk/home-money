import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './shared/services/auth.service';
import { UsersService } from './shared/services/users.service';
import { BillService } from './shared/services/bill.service';
import {AuthGuard} from './shared/services/auth.guard';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [
    UsersService,
    AuthService,
    BillService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
