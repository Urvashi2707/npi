import { Injectable } from '@angular/core';

@Injectable()
export class RequestService {

  public current_user:any; 

  constructor() { 
    this.current_user = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  getRequestType(){
      return{
          loginRequest_type:"GetUserDetailsAndPermisionsByMobileAndPassword",
          employee_type: "GetEmployeetypes",
          getAllBrand: "GetALLVehicleBrands",
          UpdateProfile: "UpdateProfile",
          getAllCompanyEmployee: "GetALLCompanyEmployees",
          getAddressType: "GetAddressType",
          getComplaint: "GetALLServiceComplaints",
          getAllCancellationReasons: "GellAllCancellationReasons",
          getChauffeurType : "GetChauffeurType",
          getProfile: "GetProfile",
          getALLVehicleVariantsBymodel: "GetALLVehicleVariantsBymodel",
          getALLVehicleModelsByBrand: "GetALLVehicleModelsByBrand",
          getAllSVC: "GetAllSVC",
          getDashboard : "GetDashboard",
          getSettlementAdviceByCompanyandDate: "getSettlementAdviceByCompanyandDate",
          getQueueSlotPerformanceByCompanyandmonthForDashboardTrends: "GetQueueSlotPerformanceByCompanyandmonthForDashboardTrends",
          getpreviousdaysSlotUtilizationPickupbyCompany: "GetpreviousdaysSlotUtilizationPickupbyCompany",
          getpreviousdaysSlotUtilizationDropbyCompany: "GetpreviousdaysSlotUtilizationDropbyCompany",
          getActiveAtCentreByCompanyIDandDATES: "GetActiveAtCentreByCompanyIDandDATES",
          getActiveDropOffsByCompanyIDandDATES: "GetActiveDropOffsByCompanyIDandDATES",
          getActiveChauffeurByCompanyIDandDATES: "GetActiveChauffeurByCompanyIDandDATES",
          getActivePickupsByCompanyIDandDATES: "GetActivePickupsByCompanyIDandDATES",
          getActiveRSA: "GetActiveRSA",
          getCREreports: "GetCREreports",
          getPausedQueueByCompanyIDAndDates: "GetPausedQueueByCompanyIDAndDates",
          getCanceledQueueByCompanyIDAndDates: "GetCanceledQueueByCompanyIDAndDates",
          getCompletedQueueByCompanyIDAndDates : "GetCompletedQueueByCompanyIDAndDates",
          getUpcomingBooking: "GetUpcomingBooking",
          getUnconfrimedBookings: "GetUnconfrimedBookings",
          getMishaps: "GetMishaps",
          getQueuesbyDateRange: "GetQueuesbyDateRange",
          getServiceType: "GetServiceType",
          AcceptTerms:"AcceptTerms",
          getAllQueueStatus:"GetAllQueueStatus",
          getReportMatrix: "GetReportMatrix",
          getALLCompanyEmployeesByType: "GetALLCompanyEmployeesByType",
          UpdateServiceAdvisor: "UpdateServiceAdvisor",
          CreateBooking: "CreateBooking",
          UpdatePickup: "UpdatePickup",
          CancelQueuebyID: "CancelQueuebyID",
          GetQueueImagesbyLegandTaskID: "GetQueueImagesbyLegandTaskID",
          GetQueueImageStages: "GetQueueImageStages",
          GetQueueHistoryByQueueID: "GetQueueHistoryByQueueID",
          GetQueueSMSandCalls: "GetQueueSMSandCalls",
          GetQueueTickets: "GetQueueTickets",
          GetQueueDetailsByQueueID: "GetQueueDetailsByQueueID",
          MasterSearch: "MasterSearch",
          UpdateSVCuser: "UpdateSVCuser",
          GetALLCompanyEmployees: "GetALLCompanyEmployees",
          UpdateEmployeeSataus: "UpdateEmployeeSataus",
          CreateSvcUser: "CreateSvcUser",
          AddPrepaidCredits: "AddPrepaidCredits",
          PaymentResponse: "PaymentResponse",
          GetPrepaidStatementsbyCompanyandDates: "GetPrepaidStatementsbyCompanyandDates",
          GetPrepaidPendingByCompanyandDates: "GetPrepaidPendingByCompanyandDates",
          Getpayment_transactions: "Getpayment_transactions",
          GetpaymentStates : "GetpaymentStates",
          AddPaymentQueue: "AddPaymentQueue",
          UpdateEmployeePassword: "UpdateEmployeePassword",
          GetALLSVCbyBrandandRegion: "GetALLSVCbyBrandandRegion",
          Forgotpassword: "Forgotpassword",
          resetpassword: "resetpassword",
          VerifyPasswordOTP: "VerifyPasswordOTP",
          GetQueueRoutes : "GetQueueRoutes",
          GetAccountVehicle: "GetAccountVehicle",
          GetSlotsByDateRegionService: "GetSlotsByDateRegionService",
          GetQueueTaskTypeByQueueTypeID: "GetQueueTaskTypeByQueueTypeID",
          GetAllCityByCityID: "GetAllCityByCityID",
          GetALLCityByCountryID: "GetALLCityByCountryID",
          ChangeCompany: "ChangeCompany",
          GetChauffeurSlots: "GetChauffeurSlots",
          GetPickupSlots : "GetPickupSlots",
          GetDropSlots: "GetDropSlots",
          Uploadinvoice: "Uploadinvoice",
          SendQueueTrackingMessage: "SendQueueTrackingMessage",
          GetUnconfrimedBookingsDetails: "GetUnconfrimedBookingsDetails",
          getNotChekedInByCompanyIDandDates: "getNotChekedInByCompanyIDandDates",
          getALLDisabledCompanyEmployees: "GetALLDisabledCompanyEmployees"
       }
  }

  getUserId(){
    var UserId = this.current_user['account_id'];
    return UserId
}

getAgreementStatus(){
    var agree_terms = this.current_user['acceptanced_terms_version'];
    console.log(agree_terms,"session storage accepted terms")
    return agree_terms
}

getFirstName(){
    var first_name = this.current_user['first_name'];
    return first_name
} 

 getSVCId(){
    var svc_id = this.current_user['company_id'];
    return svc_id
}

getCountryId(){
    var svc_id = this.current_user['country_id'];
    return svc_id
}


getCountryCode(){
     var country_code = this.current_user['country_code'];
     console.log(country_code,"brand_id")
    return country_code
}

getLastName(){
    var last_name = this.current_user['last_name'];
    return last_name
}

getCompanyName(){
    var company_name = this.current_user['company_name'];
    return company_name
}

getFullName(){
    var Full_name = this.current_user['first_name'] + ' ' + this.current_user['last_name'];
    return Full_name
}

getStateID(){
    var StateId = this.current_user['state_id'];
    return StateId
} 

getCityId(){
    var City_id = this.current_user['city_id'];
    return City_id
} 

getBrandId(){
    var brand_id = this.current_user['brand_id'];
    console.log(brand_id,"brand_id")
    return brand_id
}

getGrpAdmin(){
    var grp_admin = this.current_user['is_group_admin'];
    return grp_admin
}

getSVCAdmin(){
    var svc_admin = this.current_user['is_admin'];
    return svc_admin
}

getIs_Insurance(){
    var is_insurance = this.current_user['is_insurance'];
    return is_insurance
}

getIs_Manufacturer(){
    var is_manufacturer = this.current_user['is_manufacturer'];
    return is_manufacturer
}

get_CountryCode(){
    var country_code = this.current_user['country_code'];
    return country_code
}

getCityName(){
    var city_name = this.current_user['city_name'];
    return city_name
}


}