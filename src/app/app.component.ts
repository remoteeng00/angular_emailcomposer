import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiService } from "./api.service";
import { Subject } from "rxjs";
import {
  IpEmailBuilderService,
  Structure,
  TextBlock,
  IPEmail
} from "ip-email-builder";
import { map, catchError, exhaustMap, takeUntil } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "emailcomposer";

  private componentDestroyed$ = new Subject();
  private uuid: string;
  private clientSlug: string;
  private dbName: string; 
  private clientId: string;
  private currentEmail$;

  

  constructor(
    private ngb: IpEmailBuilderService,
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
