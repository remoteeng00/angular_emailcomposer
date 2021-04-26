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
  private clientSlug: string; 



  currentEmail$ = this.route.paramMap.pipe(
    map(params => params.get("uuid")),
    exhaustMap(id => this.apiService.getEmail(id, this.clientSlug))
  );

  constructor(
    private ngb: IpEmailBuilderService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.clientSlug = this.route.snapshot.params.client;
  }

  ngOnInit() {
    this.ngb.onTemplateCreated$
      .pipe(
        exhaustMap(([email, template]) =>
          this.apiService.saveEmail(email, template)
        ),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(() => console.log("Email and Template saved."));
  }

  ngOnDestroy() {
    // cleanup logic goes here
  }
}
