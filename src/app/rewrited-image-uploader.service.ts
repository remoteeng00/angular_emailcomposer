import { Injectable } from '@angular/core';
import { of, defer } from 'rxjs';
import { delay } from 'rxjs/operators';

import { IpUserImageUploaderService } from 'ip-email-builder';
// import { IpUserImageUploaderService } from 'projects/ip-email-builder/src/public_api';

// @Injectable()
export class RewritedImageUploader extends IpUserImageUploaderService {
    browse$() {
        return defer(() => of('http://wp4.ourwpdemo.com/crystalowp/wp-content/uploads/2019/06/v1-3.jpg').pipe(delay(4000)))
    }
}
