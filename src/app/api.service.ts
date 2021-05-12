import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
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

  saveEmail(email: IPEmail, template: string, uuid: string, clientSlug: string, dbName: string, clientId: string) {
    // email is the Object you need to save in order to edit it later
    // template is the HTML ready to use
    const options = { 
      params: new HttpParams().set('_i', uuid).set('_cs', clientSlug).set('_dn', dbName).set('_ci', clientId),
      
    };
    const body = { 
      _i: uuid,
      _cs: clientSlug,
      _dn: dbName,
      _ci: clientId,
      email: email,
      template: template
    };
    return this.http.post(this.configuration.apiPath + "save", body, options);
  }

  uploadImage(imagepath: string) {
    // email is the Object you need to save in order to edit it later
    // template is the HTML ready to use
    
    return this.http.post(this.configuration.apiPath + "save", imagepath);
  }

  getMergeTags(){
    return this.http.get(this.configuration.apiPath + "mergetags/get");
  }


  getEmail(uuid: string, clientSlug: string, dbName: string, clientId: string): Observable<IPEmail> {
    const options = { 
      params: new HttpParams().set('_i', uuid).set('_cs', clientSlug).set('_dn', dbName).set('_ci', clientId)
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
