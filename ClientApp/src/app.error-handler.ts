import { ToastrService } from 'ngx-toastr';
import { ErrorHandler,Inject, NgZone , isDevMode } from "@angular/core";
import * as Raven from 'raven-js';
export class AppErrorHandler implements ErrorHandler{
    constructor(
      private ngZone: NgZone,

      @Inject(ToastrService) private toast: ToastrService
    ) { }
    handleError(error: any): void {
        // if(!isDevMode){
        Raven.captureException(error.originalError || error)
        // }
        // else throw error;
       // else console.log(error.originalError || error);
        //  this.ngZone.run(()=>{
        //      this.toast.error('An error Happened , Thanks for verifying your informations !','Error detected');
        //   });
      // console.log(error.originalError||error);
       console.error(error.fileName, error.lineNumber, ':', error.columnNumber, '\n', error.message, error.rejection)
    }
    }

