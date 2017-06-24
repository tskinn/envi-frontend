import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdInputModule } from '@angular/material';

import { LoginRoutingModule } from './login-routing.module';
import { LoginContainerComponent } from './login-container/login-container.component';

@NgModule({
  imports: [
    CommonModule,
    MdInputModule
  ],
  declarations: [LoginContainerComponent]
})
export class LoginModule { }
