import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {delay} from 'rxjs/operators';
import {deferOf, IpUserRestApiService, SocialBlock, Structure, TextBlock} from 'ip-email-builder';
import {MyUploaderImageService} from "./my-uploader-image.service"
import {of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MyApiServiceService extends IpUserRestApiService {

    getAllUserMergeFields$ = this.http.get<string[]>('http://b326f60d361f.ngrok.io/apis/ng_mergetags.php');
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
                        font: {size: 20},
                        color: '#292525',
                        padding: {top: 0, bottom: 0}
                    }),
                    new SocialBlock([
                        {name: 'facebook', href: '#'},
                        {name: 'twitter', href: '#'},
                        {name: 'pinterest', href: '#'},
                        {name: 'youtube', href: '#'},
                    ], {
                        padding: {top: 0}
                    })
                ]
            ])
        }
    ]).pipe(delay(2000));

    constructor(http: HttpClient) {
        super(http);
    }

    // getAllUserTemplates$ = this.http.get<IUserTemplateCategory[]>('http://localhost:3002/templates')

    getUserImages$() {
        return of([])
        // return this.http.get<string[]>('http://b326f60d361f.ngrok.io/apis/ng_userimages.php');
    }
    userImageUpload$(fromData: FormData, imagePath: string) {
        fromData.forEach((ent, key) => console.log(ent, key))
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
