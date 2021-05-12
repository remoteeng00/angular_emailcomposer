import { Injectable } from '@angular/core';
import { of, EMPTY } from 'rxjs';
// import { IpUserMiddlewaresService, IAddStructureEvent } from 'projects/ip-email-builder/src/lib/user-middleware-service';
// import { IpEmailBuilderService } from 'projects/ip-email-builder/src/lib/ip-email-builder.service';
import { IpUserMiddlewaresService, IAddStructureEvent } from 'ip-email-builder';


// @Injectable()
export class CustomIpMiddlewares extends IpUserMiddlewaresService {

  addStructure(event: IAddStructureEvent) {
    // console.log(event);
    // if (event.previousIndex === 4) {
    //   this.ngb.notify('You\'re not allowed to do this action');
    //   return EMPTY;
    // }
    return of(event);
  }

  preventWindowExit(event: BeforeUnloadEvent) {
    return super.preventWindowExit(event);
  }

}
