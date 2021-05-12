import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { delay, shareReplay } from 'rxjs/operators';
import { deferOf, IpUserRestApiService, IpUserImageUploaderService, Structure, TextBlock, SocialBlock } from 'ip-email-builder';
import { map, startWith } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import {MyUploaderImageService} from "./my-uploader-image.service"

@Injectable({
  providedIn: 'root'
})
export class MyApiServiceService extends IpUserRestApiService{

  constructor(http: HttpClient, 
    private _myUploaderImageService: MyUploaderImageService,
    //public _myUploaderImageService: IpUserImageUploaderService
    ) {
    super(http);
  } 

  getAllUserMergeFields$ =  this.http.get<string[]>('http://b326f60d361f.ngrok.io/apis/ng_mergetags.php');


  getUserImages$() {
    return this.http.get<string[]>('http://b326f60d361f.ngrok.io/apis/ng_userimages.php');
  }

  // getAllUserTemplates$ = this.http.get<IUserTemplateCategory[]>('http://localhost:3002/templates')

  getAllUserModules$ = deferOf([
    {
      name: 'header',
      module: new Structure('cols_1', [
        [
          new TextBlock('<h2 class="ql-align-center">Hello {{username}}.</h2>', {
            font: {
              family: 'Fira Sans',
              size: 21
            }
          })
        ]
      ])
    },
    {
      name: 'footer',
      module: new Structure('cols_1', [
        [
          new TextBlock('<p class="ql-align-center">Subscribe to our channels!</p>', {
            font: { size: 20 },
            color: '#292525',
            padding: { top: 0, bottom: 0 }
          }),
          new SocialBlock([
            { name: 'facebook', href: '#' },
            { name: 'twitter', href: '#' },
            { name: 'pinterest', href: '#' },
            { name: 'youtube', href: '#' },
          ], {
            padding: { top: 0 }
          })
        ]
      ])
    }
  ]).pipe(delay(2000));

  // getUserImages$() {
  //   return deferOf(Array.from({ length: 1000 }).map(() => 'https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')).pipe(delay(1000))
  // }

  userImageUpload$(fromData: FormData, imagePath: string) {

    //var imagePath = this._myUploaderImageService.browse$;
    return deferOf(new HttpResponse({
      body: {
        success: true,
        path: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
      }
    })).pipe(delay(1000))
  }

  // createHTMLTemplate$(emailAndFonts: IEmailAndGoogleFonts) {
  //   return this.http.post<IMjmlServerResponse>('http://localhost:3002', emailAndFonts)
  // }
}
