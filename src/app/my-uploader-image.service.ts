import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { delay, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { deferOf, IpUserImageUploaderService } from 'ip-email-builder';
import { map, startWith } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";

import {
    IpEmailBuilderService,
    IpUserRestApiService,
  } from "ip-email-builder";
import { Browser } from 'selenium-webdriver';
import {MyApiServiceService} from "./my-api-service.service"

@Injectable({
  providedIn: 'root'
})
export  class MyUploaderImageService extends IpUserImageUploaderService{
     
     constructor() {
        super();
    }
 
    browse$

//  async browse() {
//     const imagePath = await this._myApiServiceService..open(); // This depends on your implementation
//     return Promise.resolve(imagePath);
//     // Or even simple
//     // return this.gallery.open()
//   }

}
