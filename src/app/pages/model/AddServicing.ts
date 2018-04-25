export interface IServicing {
  registrationNumber:string;
  VehicleBrand:string;
  VehicleModel:string
  Vehiclevariant:string;
  Cus_name:string;
  Cus_number1:string;
  Cus_number2:string;
  Cus_email:string;
  assign_Amb:string;
  servicing:string;
  servicing_Date:string;
  servicing_Slot:string;
  pickup_location:string;
  pickup_latlong:string;
  dropoff_location:string;
  dropoff_latlong:string;
  service_type:string ;
  complaint:string;
  service_advisor:string;
  cre:string;
  notes:string;
}
export interface IRsa {
  registrationNumber:string;
  VehicleBrand:string;
  VehicleModel:string
  Vehiclevariant:string;
  Cus_name:string;
  Cus_number1:string;
  Cus_number2:string;
  Cus_email:string;
  assign_Amb:string;
  servicing:string;
  servicing_Date:string;
  servicing_Slot:string;
  pickup_location:string;
  pickup_latlong:string;
  dropoff_location:string;
  dropoff_latlong:string;
  service_type:string ;
  complaint:string;
  service_advisor:string;
  cre:string;
  notes:string;
}
export class custinfo {
  cusinfo: any;
  addresses: any;
  carinfo: any;

}

export class Brands {
  brands: any;

}

export interface IModelsList {
  brand_id:number
  model_id:number
  model_name:string
}
