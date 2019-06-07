import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {

  public current_user:any;  

  constructor() {
      this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
   }
    getUserId(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var UserId = this.current_user['account_id'];
        return UserId
    }

    getAgreementStatus(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var agree_terms = this.current_user['acceptanced_terms_version'];
        return agree_terms
    }
   
    getFirstName(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var first_name = this.current_user['first_name'];
        return first_name
    } 

    getLatitude(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var latitude = this.current_user['latitude'];
        return latitude
    } 

    getSvcAddress(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var address = this.current_user['address'];
        return address
    } 

    getLongitude(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var longitude = this.current_user['longitude'];
        return longitude
    } 

    getCurrencyId(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var currency_id = this.current_user['currency_id'];
        return currency_id
    } 

     getSVCId(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var svc_id = this.current_user['company_id'];
        return svc_id
    }

    getCountryId(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var svc_id = this.current_user['country_id'];
        return svc_id
    }
  

    getCountryCode(){
         var country_code = this.current_user['country_code'];
        return country_code
    }

    getLastName(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var last_name = this.current_user['last_name'];
        return last_name
    }

    getCompanyName(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var company_name = this.current_user['company_name'];
        return company_name
    }
    
    getFullName(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var Full_name = this.current_user['first_name'] + ' ' + this.current_user['last_name'];
        return Full_name
    }
    
    getStateID(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var StateId = this.current_user['state_id'];
        return StateId
    } 

    getCityId(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var City_id = this.current_user['city_id'];
        return City_id
    } 

    getBrandId(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var brand_id = this.current_user['brand_id'];
        return brand_id
    }

    getGrpAdmin(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var grp_admin = this.current_user['is_group_admin'];
        return grp_admin
    }

    getSVCAdmin(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var svc_admin = this.current_user['is_admin'];
        return svc_admin
    }

    getIsGrpAdmin(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var grp_admin = this.current_user['is_group_admin'];
        if(grp_admin == 1){
            return true
        }
        else{
            return false
        }
        
    }

    getIsSVCAdmin(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var svc_admin = this.current_user['is_admin'];
        if(svc_admin == 1){
            return true
        }
        else{
            return false
        }
    }

    get_IsMultibrand(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var is_multibrand = this.current_user['is_multibrand'];
        if(is_multibrand == 1){
            console.log("multibrand is giving true");
            return true
        }
        else{
            console.log("multibrand is giving true");
            return false
        }
    }

    getIs_Insurance(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var is_insurance = this.current_user['is_insurance'];
        return is_insurance
    }

    getIs_Manufacturer(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var is_manufacturer = this.current_user['is_manufacturer'];
        return is_manufacturer
    }

    get_CountryCode(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var country_code = this.current_user['country_code'];
        return country_code
    }

    getCityName(){
        this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
        var city_name = this.current_user['city_name'];
        return city_name
    }

}