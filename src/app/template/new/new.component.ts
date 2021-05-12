import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiService } from "../../api.service";
import { Subject } from "rxjs";
import {
  IpEmailBuilderService,
  IpUserRestApiService,
  IpUserImageUploaderService,
  Structure,
  TextBlock,
  IPEmail,
  deferOf
} from "ip-email-builder";
import { delay, map, catchError, exhaustMap, takeUntil } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";

import {MyApiServiceService} from "../../my-api-service.service"
import {MyUploaderImageService} from "../../my-uploader-image.service"
import { getLocaleDateFormat } from '@angular/common';
import { async } from 'q';
import ImageUploader from 'ip-email-builder/lib/services/user-image-uploader-service/free-users-image-uploader.service';
import { promise } from 'selenium-webdriver';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})

export class NewComponent implements OnInit, OnDestroy  {

  title = "emailcomposer";

  private componentDestroyed$ = new Subject();
  private uuid: string;
  private clientSlug: string;
  private dbName: string; 
  private clientId: string;
  private currentEmail$;
  public imagePath: any;

  

  constructor(
    private ngb: IpEmailBuilderService,
    private urs: IpUserRestApiService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private _myApiServiceService: MyApiServiceService,
    private _myUploaderImageService: MyUploaderImageService
  ) {
    this.route.queryParams
      .subscribe(params => {
        this.uuid = '';
        this.clientSlug = params._cs;
        this.dbName = params._dn;
        this.clientId = params._ci;
      });   
  }

  ngOnInit() {
    
    this.ngb.onTemplateCreated$
      .pipe(
        exhaustMap(([email, template]) =>
          this.apiService.saveEmail(email, template, this.uuid, this.clientSlug, this.dbName, this.clientId)
        ),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(() => console.log("Email and Template saved."));

      //console.log(this._myUploaderImageService.browse$);
      //console.log(this.urs.userImageUpload$);
     
     this.urs.userImageUpload$ = this._myApiServiceService.userImageUpload$;
     this.getUserData();
     //this.getImagePath("");

  }

  ngOnDestroy() {
    // cleanup logic goes here
  }

  //#region Method

  // getImagePath(test){
  //   this.imagePath = test;
  // }

  getUserData(){
    //get user merge fields from server side
    this.urs.getAllUserMergeFields$ = this._myApiServiceService.getAllUserMergeFields$;

    //get user uploaded images from server side
    this.urs.getUserImages$ = this._myApiServiceService.getUserImages$;

  }

  //#endregion


  

}
