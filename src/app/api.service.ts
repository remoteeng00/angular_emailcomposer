import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { startWith } from "rxjs/operators";
import { IPEmail } from "ip-email-builder";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  saveEmail(email: IPEmail, template: string) {
    // email is the Object you need to save in order to edit it later
    // template is the HTML ready to use
    return this.http.post("/abc", null, null);
  }

  getEmail(id: string): Observable<IPEmail> {
    return this.http.get<IPEmail>("/abc").pipe(
      startWith(new IPEmail())
    );
  }
}
