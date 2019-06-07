import { Injectable } from '@angular/core';


@Injectable()
export class RoleGaurdService {

  public current_user:any;  

  constructor() {
      this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
   }
 
    getGrpAdmin(){
        var grp_admin = this.current_user['is_group_admin'];
        if(grp_admin === 0){
            return false;
        }
        else{
            return true;
        }
    }

    getSVCAdmin(){
        var svc_admin = this.current_user['is_admin'];
        if(svc_admin === 0){
            return false;
        }
        else{
            return true;
        }
    }

    getIs_Insurance(){
        var is_insurance = this.current_user['is_insurance'];
        if(is_insurance == "1"){
            return true;
        }
        else{
            return false;
        }
    }

    getIs_Manufacturer(){
        var is_manufacturer = this.current_user['is_manufacturer'];
        if(is_manufacturer === "0"){
            return false;
        }
        else{
            return true;
        }
    }

}