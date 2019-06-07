import { Injectable } from '@angular/core';

@Injectable()
export class ErrorMsgService {

  constructor() { }
 
  getValidation(){
    return{
      mobilePattern: "^(\d{8})(\d{2})?$",
    }
  }
  
  getSplChrErr(){
      return "*Please note that the special characters \$^*'}'`;> are not allowed."
  }

  getNoDataErr(){
    return "No Data to Display."
  }

  getPsswrdWrng(){
    return "Password and Confirm Password do not match. Please check."
  }

  getQueueSlot(){
    return "Please select Queue Slot"
  }

  getMobileErrMsg(){
    return "Mobile length should be between 8 or 10"
  }
 
  

}