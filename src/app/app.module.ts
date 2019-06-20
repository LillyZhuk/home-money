import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SystemModule } from './system/system.module';
import { AuthService } from './shared/services/auth.service';
import { UsersService } from './shared/services/users.service';
import { BillService } from './shared/services/bill.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    SystemModule
  ],
  providers: [
    UsersService,
    AuthService,
    BillService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
