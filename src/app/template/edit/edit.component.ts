import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiService } from "../../api.service";
import { Subject } from "rxjs";
import {
  IpEmailBuilderService,
  IpUserRestApiService,
  Structure,
  TextBlock,
  IPEmail,
  deferOf
} from "ip-email-builder";
import { map, catchError, exhaustMap, takeUntil } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-new',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})


export class EditComponent implements OnInit, OnDestroy  {

  title = "emailcomposer";

  private componentDestroyed$ = new Subject();
  private uuid: string;
  private clientSlug: string;
  private dbName: string; 
  private clientId: string;
  private currentEmail$;

  

  constructor(
    private ngb: IpEmailBuilderService,
    private urs: IpUserRestApiService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams
      .subscribe(params => {
        this.uuid = params._i;
        this.clientSlug = params._cs;
        this.dbName = params._dn;
        this.clientId = params._ci;
        this.currentEmail$ = this.apiService.getEmail(this.uuid, this.clientSlug, this.dbName, this.clientId);
        urs.getAllUserMergeFields$ = deferOf(['{{PERSON_FNAME}}', '{{PERSON_LNAME}}', '{{PERSON_PHONE}}', '{{PERSON_EMAIL}}', '{{SALESPERSON_EMAIL}}', '{{SALESPERSON_FNAME}}', '{{SALESPERSON_LNAME}}', '{{COMPANY_NAME}}', '{{COMPANY_WEB_URL}}', '{{COMPANY_EMAIL}}', '{{UNSUBSCRIBE_URL}}']);
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

  }

  ngOnDestroy() {
    // cleanup logic goes here
  } 

}
