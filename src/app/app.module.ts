import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { 
  IpEmailBuilderModule, 
  IpUserRestApiService,
  IpUserImageUploaderService, 
  IpUserMiddlewaresService
} from 'ip-email-builder';

import { AppComponent } from './app.component';
import { RewritedImageUploader } from './rewrited-image-uploader.service';
import { CustomIpMiddlewares } from './custom-middleware.service';
import { ApiService } from './api.service';

@NgModule({
  imports:      [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([]),
    IpEmailBuilderModule.withConfig({
      xApiKey: "TMf0v2r8BJ6fy0eL4ztyn2D7E7SJz4tfRtfYDMbc"
    })
  ],
  providers: [
    { provide: IpUserRestApiService, useClass: ApiService },
    { provide: IpUserImageUploaderService, useClass: RewritedImageUploader },
    { provide: IpUserMiddlewaresService, useClass: CustomIpMiddlewares }
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
