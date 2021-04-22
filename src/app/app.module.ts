import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IpEmailBuilderModule } from 'ip-email-builder';

import { AppComponent } from './app.component';

export function appInit(appConfigService: AppConfigService) {
  return () => appConfigService.load();
}

const CustomConfig = {
      
    };

@NgModule({
  imports:      [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot({
      basePath: "http://localhost/yuan/dev/public/",
      apiPath: "http://localhost/yuan/dev/public/api/angular/template/",
      uploadImagePath: "http://localhost/yuan/dev/public/api/angular/template/upload_image",
      xApiKey: "TMf0v2r8BJ6fy0eL4ztyn2D7E7SJz4tfRtfYDMbc",
      uploadImageName: "angular_email_template_image"
    }),
    IpEmailBuilderModule.withConfig()
  ],
  providers: [],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
}) 
export class AppModule { }
