import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MyApiServiceService} from "./my-api-service.service";
//    import { RouterModule, Routes } from '@angular/router';
import {IpEmailBuilderModule, IpUserRestApiService} from 'ip-email-builder';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NewComponent} from './template/new/new.component';
import {EditComponent} from './template/edit/edit.component';
import {PageNotFoundComponent} from './pagenotfound/pagenotfound.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        IpEmailBuilderModule.withConfig({
            xApiKey: "TMf0v2r8BJ6fy0eL4ztyn2D7E7SJz4tfRtfYDMbc",
            uploadImagePath: "http://b326f60d361f.ngrok.io/apis/ng_uploadimage.php",
            uploadImageName: "test",
        })
    ],
    providers: [
        {provide: IpUserRestApiService, useClass: MyApiServiceService}
        // {provide: IpUserImageUploaderService, useClass: RewritedImageUploader}
    ],
    declarations: [
        AppComponent,
        NewComponent,
        EditComponent,
        PageNotFoundComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
