import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { requestBody } from '../models/ModelFile';
import { UtilHttpService } from '../utilities/UtilHttpService';

@Injectable({
  providedIn: 'root'
})
export class HttpdService extends UtilHttpService{
  URL_BASE = '/api/v1/files';
  constructor(injector: Injector) {
    super(injector);
  }


   getFiles<Response>():Observable<any>{
    console.log("getFiles"); 
    console.log(this.URL_BASE);
     return super.get(this.URL_BASE);
   }

   getById(id:number){
     console.log(this.URL_BASE + "/" +id);
     return super.get(this.URL_BASE + "/" +id);
   }

   postSave(requestB:requestBody){
    return super.post(this.URL_BASE+"/save", requestB);
   }

}
