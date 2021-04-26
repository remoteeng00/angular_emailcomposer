import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { startWith } from "rxjs/operators";
import { IPEmail } from "ip-email-builder";
import { HttpClient, HttpParams } from "@angular/common/http";
import { config } from '../ng-config/development';
import { ConfigurableFocusTrap } from '@angular/cdk/a11y';

@Injectable({
  providedIn: "root"
})
export class ApiService {

  private configuration = config;

  constructor(private http: HttpClient) {} 

  saveEmail(email: IPEmail, template: string) {
    // email is the Object you need to save in order to edit it later
    // template is the HTML ready to use
    return this.http.post("/abc", null, null);
  }

  getEmail(id: string, clientName: string): Observable<IPEmail> {
    const options = { 
      params: new HttpParams().set('uuid', id)
    };
    return this.http.get<IPEmail>(this.configuration.apiPath + "get", options).pipe(
      startWith(new IPEmail())
    );
  }

  getUserImages(id: string) {
    /*return this.http.get<IPEmail>("").pipe(
      startWith(new IPEmail())
    );*/
  }
}
