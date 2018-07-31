import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { QueueTableService } from '../services/queue-table.service';
import { ServerService } from '../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalQueueComponent } from './modal-queue/modal-queue.component';
import { ModalSendLinkComponent } from './modal-send-link/modal-send-link.component'
import { SearchModalComponent } from '../search/modal/searchModal.component';
import { ModalPickupComponent } from './modal-pickup/modal-pickup.component';
import { ModalAdvComponent } from './modal-adv/modal-adv.component';

@Component({
  selector: 'app-queue-details',
  templateUrl: './queue-details.component.html',
  styleUrls: ['./queue-details.component.scss']
})
export class QueueDetailsComponent implements OnInit {

  pickCardForm: FormGroup;
  pickupHandedToForm: FormGroup;
  dropoffForm: FormGroup;
  dropHandedToForm: FormGroup;
  creFormGroup: FormGroup;
  ambassadorFormGroup: FormGroup;
  vehicle_at_svc_formGroup: FormGroup;
  serviceDetailsCard: FormGroup;
  chauffeur_card: FormGroup;
  notesFormGroup: FormGroup;
  link: string;
  rating = "3.4";
  public advInfo:any= {};
  public feedback:any;
  showPickupCard: String = '0';
  showDropCard: String = '0';
  showCRECard: String = '0';
  showAmbCard: String = '0';
  showAtSVCCard: String = '0';
  showNotesCard: String = '1';
  showFeedbackCards:string = "0";
  showNewFeedbackCards:string = "0";
  showFeedbackCard: String = '0';
  showServiceCard: String = '0';
  showChauffeurCard: String = '0';
  showComplaintsCard: String = '1';
  feedbackRating:number;

  ProfileLink: String = "https://profile.actionsprout.com/default.jpeg";
  EditLink: String = "http://cdn.mysitemyway.com/icons-watermarks/simple-light-gray/bfa/bfa_edit/bfa_edit_simple-light-gray_512x512.png";
  SaveImageLink: String = "https://d30y9cdsu7xlg0.cloudfront.net/png/22557-200.png";
  pickOnTimeImage: String = "https://www.hypnoslimming.com/uploads/6/5/3/7/65375683/green-tick_4_orig.png";
  dropOffOnTimeImage: String = "https://www.hypnoslimming.com/uploads/6/5/3/7/65375683/green-tick_4_orig.png";
  invoiceUploaded: String = "https://www.hypnoslimming.com/uploads/6/5/3/7/65375683/green-tick_4_orig.png";
  successImg: String = "https://www.hypnoslimming.com/uploads/6/5/3/7/65375683/green-tick_4_orig.png";
  failimg: String = "http://andreakihlstedt.com/wpsys/wp-content/uploads/2013/07/NO.jpg";
  est_link: string = "";
  invoice_link: string = "";
  service_status: string = '0';
  is_edit: boolean = true;

  CustomerName: String = "Customer Name";
  CustomerNumber: String = "Customer Number";
  CustomerEmail: String = "xyz@21north.in";

  VehicleNumber: String = "Vehicle No";
  VehicleBrand: String = "Brand";
  VehicleModel: String = "Model";
  VehicleVariant: String = "Variant";
  QueueID:string;
  complaints: String = 'No Data';
  cancelReasons: any;
  sysClicked: any = '0';
  estAmount:string;
  InvAmt:string;
  Amt:string;
  QueueTIme:string;
  custInfo: any = {};
  pickupInfo:any = {};
  dropInfo:any = {};
  adv_name:string;
  ratting:number;
  brandid:string;
  constructor(private modalService: NgbModal, private fb: FormBuilder, private _detailsTable: QueueTableService, private _data: ServerService) {


    this.pickCardForm = this.fb.group({
      pickupAddress: [{ value: '', disabled: true }],
      pickup_slot: [{ value: '', disabled: true }],
      puambName: [{ value: '', disabled: true }],
    });

    this.pickupHandedToForm = this.fb.group({
      hand_to_name: [{ value: '', disabled: true }],
      handed_to_number: [{ value: '', disabled: true }]
    })

    this.dropoffForm = this.fb.group({
      dropAddress: [{ value: '', disabled: true }],
      dropSlot: [{ value: '', disabled: true }],
      dropAmbName: [{ value: '', disabled: true }],
      dropOnTime: [{ value: '', disabled: true }],
      amount: [{ value: '', disabled: true }],
      payment_type: [{ value: '', disabled: true }],
    });

    this.dropHandedToForm = this.fb.group({
      dropHandoverName: [{ value: '', disabled: true }],
      dropHandoverNumber: [{ value: '', disabled: true }]
    })

    this.creFormGroup = this.fb.group({
      creName: [{ value: '', disabled: true }],
      creNumber: [{ value: '', disabled: true }],
      advName: [{ value: '', disabled: true }],
      advNumber: [{ value: '', disabled: true }]
    });

    this.ambassadorFormGroup = this.fb.group({
      ambassadorName: [{ value: '', disabled: true }],
      ambassadorNumber: [{ value: '', disabled: true }]
    });

    this.vehicle_at_svc_formGroup = this.fb.group({
      estAmount: [{ value: '', disabled: true }],
      ETD: [{ value: '', disabled: true }],
      invoiceAmount: [{ value: '', disabled: true }],
    });

    this.serviceDetailsCard = this.fb.group({
      service_type: [{ value: '', disabled: true }],
      service_cost: [{ value: '', disabled: true }],
    });

    this.chauffeur_card = this.fb.group({
      pick_add: [{ value: '', disabled: true }],
      slot: [{ value: '', disabled: true }],
      chauffeur_name: [{ value: '', disabled: true }],
      service_type: [{ value: '', disabled: true }],
      started_at: [{ value: '', disabled: true }],
      ended_at: [{ value: '', disabled: true }],
    });

    this.notesFormGroup = this.fb.group({
      notesData: [{ value: '', disabled: false }]
    });

    this.ratting = 3;
  }

  ngOnInit() {
    this.brandid = sessionStorage.getItem('brandid');
    this.sysClicked = sessionStorage.getItem('clickedOn');
    // console.log(this.sysClicked);
    this.QueueID = sessionStorage.getItem('QueueId');
  }
  sendPaymentLink() {
    const activeModal = this.modalService.open(ModalSendLinkComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Send Payment Link';
    activeModal.componentInstance.modalContent = this.CustomerNumber;
  }
  viewInvoice() {
    this.showUploadModal("");
    // window.open(this.invoice_link, "_blank");
  }
  viewEstimate() {
    window.open(this.est_link, "_blank");
  }

  viewInv() {
    window.open(this.invoice_link, "_blank");
  }
  cancelBooking() {
    const reqpara3 = {
      requesttype: 'cancelreasons',
      typeofrequest: '1',
    }
    const as3 = JSON.stringify(reqpara3);
    this._data.webServiceCall(as3).subscribe(res => {
      const check = res.valueOf();
      this.cancelReasons = check[0].reasons;
      this.showLargeModal(this.cancelReasons[0].description);
      // console.log(this.cancelReasons);
    });
  }
  datatopass: any;
  dataForModal: any;
  dropSlotTime: String = "Not Selected";
  on_time: any = "1";

  showUploadModal(name: string) {
    console.log(this.service_status);
    console.log(this.advInfo[0].adv_name);
    if(this.InvAmt != "0"){
              this.Amt = this.InvAmt;
              console.log(this.Amt)
            }
            else{
              this.Amt = this.estAmount;
              console.log(this.Amt)
            }
   
   const activeModal = this.modalService.open(SearchModalComponent, { size: 'lg', container: 'nb-layout' });
  this.datatopass = { queue_id:  sessionStorage.getItem('QueueId'),  queue_exists:  "0", type_of_service: '1',  queue_time:  this.dropSlotTime, service_status: this.service_status };
    this.dataForModal = { service_status: this.service_status,amt:this.Amt,advName:this.advInfo[0].adv_name, id: sessionStorage.getItem('QueueId'), queue_time: this.QueueTIme }
    console.log("urvashi urvi");
    activeModal.componentInstance.modalHeader = 'Upload File';
    activeModal.componentInstance.modalContent = this.dataForModal;
  }
  // showUploadModal() {
  //   if(this.InvAmt){
  //         this.Amt = this.InvAmt;
  //       }
  //       else{
  //         this.Amt = this.estAmount;
  //       }
  //   const activeModal = this.modalService.open(Modal4Component, { size: 'lg', container: 'nb-layout' });
  //  this.dataForModal = { service_status: this.service_status,amt:this.Amt,advName:this.advInfo[0].adv_name, id: sessionStorage.getItem('QueueId'), queue_date: new Date }
  //   activeModal.componentInstance.modalHeader = 'Upload File';
  //   activeModal.componentInstance.modalContent ={ service_status: this.service_status,amt:this.Amt,advName:this.advInfo[0].adv_name, id: sessionStorage.getItem('QueueId'), queue_date: new Date };
  // }
  showLargeModal(name: string) {
  
    const activeModal = this.modalService.open(ModalQueueComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Cancel';
    activeModal.componentInstance.modalContent = this.cancelReasons;
    this._detailsTable.setCancelReasons(this.cancelReasons);
  }
  showpickupModal(res:any){
    const activeModal = this.modalService.open(ModalPickupComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Pickup Details';
    activeModal.componentInstance.modalContent = res;
    //  console.log(res);
    // this._detailsTable.setCancelReasons(this.cancelReasons);
  }
  showdropoffModal(res:any){
    const activeModal = this.modalService.open(ModalPickupComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'DropOff Details';
    activeModal.componentInstance.modalContent = res;
    //  console.log(res);
    // this._detailsTable.setCancelReasons(this.cancelReasons);
  }
  showdAdv(res:any){
    const activeModal = this.modalService.open(ModalAdvComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Select Advisor';
    activeModal.componentInstance.modalContent = res;
    //  console.log(res);
    // this._detailsTable.setCancelReasons(this.cancelReasons);
  }
  changeAmount(): boolean {
    if (this.is_edit == true) {
      this.is_edit = false;
    }
    else {
      this.is_edit = true;
    }
    return this.is_edit;
  }

  public tabChanged(tabData: any) {
    if (tabData.tabTitle == "SMS/Calls") {
      const reqpara3 = {
        requesttype: 'gethistory',
        queueidvar: sessionStorage.getItem('QueueId'),
        typeofrequest: '1'
      }
      const as3 = JSON.stringify(reqpara3);
      this._data.webServiceCall(as3).subscribe(res => {
        this._detailsTable.setTableData(res, 1);
      });

    } else if (tabData.tabTitle == "History") {

      const reqpara3 = {
        requesttype: 'gethistory',
        queueidvar: sessionStorage.getItem('QueueId'),
        typeofrequest: '0'
      }
      const as3 = JSON.stringify(reqpara3);
      this._data.webServiceCall(as3).subscribe(res => {
        this._detailsTable.setTableData(res, 2);
      });
    }
    // this._detailsTable.setData(2);
    // } else if (tabData.tabTitle == "Photographs"){
    //   const reqpara3 = {
    //     requesttype: 'getimagestages',
    //     queueid: sessionStorage.getItem('QueueId'),
    //     // typeofrequest: '0'
    //   }
    //   const as3 = JSON.stringify(reqpara3);
    //   this._data.createUser(as3).subscribe(res => {
    //     console.log(res);
    //   });

    // }
    else if (tabData.tabTitle == "Tickets") {

      const reqpara3 = {
        requesttype: 'gethistory',
        queueidvar: sessionStorage.getItem('QueueId'),
        typeofrequest: '2'
      }
      const as3 = JSON.stringify(reqpara3);
      this._data.webServiceCall(as3).subscribe(res => {
        this._detailsTable.setTableData(res, 12);
      });

      // this._detailsTable.setData(2);
    }
    else if (tabData.tabTitle == "Details") {
      const reqpara3 = {
        // requesttype: 'getqueuebasichistory',
        requesttype: 'getqueuebasichistoryv2',
        queueidvar: sessionStorage.getItem('QueueId'),
      }
      const as3 = JSON.stringify(reqpara3);
      this._data.webServiceCall(as3).subscribe(res => {
        const check = res.valueOf();
        const objectlength = Object.keys(check).length;
        if (objectlength > 0) {
          if (check[0].hasOwnProperty('custinfo')) {
            const custInfo = check[0].custinfo;
            this.CustomerName = custInfo[0].cust_name;
            this.CustomerNumber = custInfo[0].cust_country_code + " " + custInfo[0].cust_mobile;
            this.CustomerEmail = custInfo[0].cust_email;
            this.custInfo.custNo = custInfo[0].cust_mobile;
            sessionStorage.setItem('customerNo', custInfo[0].cust_mobile);
          }
        }
        if (objectlength > 1) {
          if (check[1].hasOwnProperty('puinfo')) {

             this.pickupInfo = check[1].puinfo;
            // console.log(this.pickupInfo);
            if (this.pickupInfo[0].hasOwnProperty('pu_address')) {
              this.showPickupCard = '1';
              let pick_address = this.pickCardForm.get('pickupAddress');
              if (this.pickupInfo[0].pu_address) {
                pick_address.setValue(this.pickupInfo[0].pu_address);
              }
            }
            if (this.pickupInfo[0].pu_time) {
              let pick_slot = this.pickCardForm.get('pickup_slot');
              pick_slot.setValue(this.pickupInfo[0].pu_time);
            }

            if (this.pickupInfo[0].handed_to_name) {
              let hand_to_name = this.pickupHandedToForm.get('hand_to_name');
              hand_to_name.setValue(this.pickupInfo[0].handed_to_name);
            }

            if (this.pickupInfo[0].handed_to_number) {
              let handed_to_number = this.pickupHandedToForm.get('handed_to_number');
              handed_to_number.setValue(this.pickupInfo[0].handed_to_number);
            }

            let amb_name = this.pickCardForm.get('puambName');
            if (this.pickupInfo[0].amb_name) {
              amb_name.setValue(this.pickupInfo[0].amb_name);
            }
            this.on_time =this.pickupInfo[0].on_time



            if (this.pickupInfo[0].on_time) {
              if (this.pickupInfo[0].on_time == '0') {
                this.pickOnTimeImage = this.failimg;
              } else {
                this.pickOnTimeImage = this.successImg;
              }
            }
          }
        }
        if (objectlength > 2) {
          if (check[2].hasOwnProperty('doinfo')) {
            this.dropInfo = check[2].doinfo;
            if (this.dropInfo[0].hasOwnProperty('do_address')) {
              this.showDropCard = '1';
              let dropAddress = this.dropoffForm.get('dropAddress');
              if (this.dropInfo[0].do_address) {
                dropAddress.setValue(this.dropInfo[0].do_address);
              }

              let dropSlot = this.dropoffForm.get('dropSlot');
              if (this.dropInfo[0].do_time) {
                this.dropSlotTime = this.dropInfo[0].do_time;
                dropSlot.setValue(this.dropInfo[0].do_time);
              }

              let dropAmbName = this.dropoffForm.get('dropAmbName');
              if (this.dropInfo[0].amb_name) {
                dropAmbName.setValue(this.dropInfo[0].amb_name);
              }

              let amount = this.dropoffForm.get('amount');
              if (this.dropInfo[0].total) {
                amount.setValue(this.dropInfo[0].total);
              }

              let payment_type = this.dropoffForm.get('payment_type');
              if (this.dropInfo[0].payment_type) {
                payment_type.setValue(this.dropInfo[0].payment_type);
              }

              let dropHandoverName = this.dropHandedToForm.get('dropHandoverName');
              if (this.dropInfo[0].handed_to_name) {
                dropHandoverName.setValue(this.dropInfo[0].handed_to_name);
              }

              let dropHandoverNumber = this.dropHandedToForm.get('dropHandoverNumber');
              if (this.dropInfo[0].handed_to_number) {
                dropHandoverNumber.setValue(this.dropInfo[0].handed_to_number);
              }

              if (this.dropInfo[0].on_time) {
                if (this.dropInfo[0].on_time == '0') {
                  this.dropOffOnTimeImage = this.failimg;
                }
                else {
                  this.dropOffOnTimeImage = this.successImg;
                }
              }
            }
          }
        }
        if(objectlength > 3){
          if (check[3].hasOwnProperty('atsvc')) {
            const atSVC = check[3].atsvc;
            if (atSVC[0].hasOwnProperty('est_amount')) {
              this.showAtSVCCard = '1';
              let estAmount = this.vehicle_at_svc_formGroup.get('estAmount');
              if (atSVC[0].est_amount) {
                estAmount.setValue(atSVC[0].est_amount);
                this.estAmount = atSVC[0].est_amount;
                console.log("EST",this.estAmount);
              }
            }
            if (atSVC[0].est_time) {
              let estTime = this.vehicle_at_svc_formGroup.get('ETD');
              estTime.setValue(atSVC[0].est_time);
              this.QueueTIme = atSVC[0].est_time;
              console.log(this.QueueTIme);
            }
            if (atSVC[0].queue_total) {
              let invoiceAmount = this.vehicle_at_svc_formGroup.get('invoiceAmount');
              invoiceAmount.setValue(atSVC[0].queue_total);
              this.InvAmt = atSVC[0].queue_total;
              console.log("INV",this.InvAmt)
            }
            if (atSVC[0].est_amount) {

            }
            if (atSVC[0].est_link) {
              this.est_link = atSVC[0].est_link;
            }
            if (atSVC[0].inv_link) {
              this.invoice_link = atSVC[0].inv_link;
            }
            if (atSVC[0].service_status) {
              this.service_status = atSVC[0].service_status;
            }
          }
        }
        // if (objectlength > 3) {
        //   if (check[3].hasOwnProperty('atsvc')) {
        //     const atSVC = check[3].atsvc;
        //     if (atSVC[0].hasOwnProperty('est_amount')) {
        //       this.showAtSVCCard = '1';
        //       let estAmount = this.vehicle_at_svc_formGroup.get('estAmount');
        //       const EstAmt = estAmount;
        //       if (atSVC[0].est_amount) {
        //         estAmount.setValue(atSVC[0].est_amount);
        //         this.estAmount = atSVC[0].est_amount;
        //         console.log(this.estAmount);
        //       }
        //     }
        //     if (atSVC[0].est_time) {
        //       let estTime = this.vehicle_at_svc_formGroup.get('ETD');
        //       estTime.setValue(atSVC[0].est_time);
        //       this.QueueTIme = atSVC[0].est_time;

        //     }
        //     if (atSVC[0].queue_total) {
        //       let invoiceAmount = this.vehicle_at_svc_formGroup.get('invoiceAmount');
        //       invoiceAmount.setValue(atSVC[0].queue_total);
        //       this.InvAmt = atSVC[0].queue_total;
        //     }
        //     if (atSVC[0].est_amount) {

        //     }
        //     if (atSVC[0].est_link) {
        //       this.est_link = atSVC[0].est_link;
        //     }
        //     if (atSVC[0].inv_link) {
        //       this.invoice_link = atSVC[0].inv_link;
        //     }
        //     if (atSVC[0].service_status) {
        //       this.service_status = atSVC[0].service_status;
        //       console.log(this.service_status);
        //     }
        //   }
        // }
        if (objectlength > 4) {
          if (check[4].hasOwnProperty('notes')) {
            const notes = check[4].notes;
            if (notes[0].notes) {
              let notesData = this.notesFormGroup.get('notesData');
              notesData.setValue(notes[0].notes);
            }
          }
        }

        if (objectlength > 9) {
          if (check[9].hasOwnProperty('ambinfo')) {
            const ambInfo = check[9].ambinfo;
            if (ambInfo[0].hasOwnProperty('amb_name')) {
              this.showAmbCard = '1';
              if (ambInfo[0].amb_name) {
                let amb_name = this.ambassadorFormGroup.get('ambassadorName');
                amb_name.setValue(ambInfo[0].amb_name);
              }

              if (ambInfo[0].amb_mobile) {
                let amb_number = this.ambassadorFormGroup.get('ambassadorNumber');
                amb_number.setValue(ambInfo[0].amb_mobile);
              }

              if (ambInfo[0].amb_link) {
                this.ProfileLink = ambInfo[0].amb_link;
              }
            }
          }
        }

        if (objectlength > 6) {
          if (check[6].hasOwnProperty('vehicleinfo')) {
            const vehInfo = check[6].vehicleinfo;
            this.VehicleNumber = vehInfo[0].veh_number;
            this.VehicleBrand = vehInfo[0].veh_brand;
            this.VehicleModel = vehInfo[0].veh_model;
            this.VehicleVariant = vehInfo[0].veh_submodel;
          }
        }
        if (objectlength > 7) {
          if (check[7].hasOwnProperty('creinfo') || check[8].hasOwnProperty('adviserinfo')) {
            const creInfo = check[7].creinfo;
            this.advInfo = check[8].adviserinfo;
            if (creInfo[0].hasOwnProperty('cre_name')) {
              this.showCRECard = '1';
              let cre_name = this.creFormGroup.get('creName');
              cre_name.setValue(creInfo[0].cre_name);

              let cre_number = this.creFormGroup.get('creNumber');
              cre_number.setValue(creInfo[0].cre_mobile);

            }
            if(this.advInfo[0].hasOwnProperty('adv_name')){
              this.showCRECard = '1';
              let adv_name = this.creFormGroup.get('advName');
              adv_name.setValue(this.advInfo[0].adv_name);
              console.log('Adv_Name');
              console.log(this.advInfo[0].adv_name);

              let adv_number = this.creFormGroup.get('advNumber');
              adv_number.setValue(this.advInfo[0].adv_mobile);
            }
             
            }
          }
        
        if (objectlength > 10) {
          if (check[10].hasOwnProperty('complaints')) {
            const complaints1 = check[10].complaints;
            if (complaints1[0].hasOwnProperty('complaint')) {

              this.complaints = complaints1[0].complaint;
            }
          }
        }
        // if (objectlength > 11) {
        //   if (check[11].hasOwnProperty('feedback')) {
        //     this.showFeedbackCards = "1";
        //     this.feedback = check[11].feedback;
        //     if(check[11].feedback[0].hasOwnProperty('no_records'))
        //     {
        //       this.showFeedbackCards = "0";
        //     }
        //   }
        // }
        if (objectlength > 12) {
          if (check[12].hasOwnProperty('newfeedback')) {
            this.showNewFeedbackCards = "1";
            this.feedback = check[12].newfeedback;
            if(check[12].newfeedback[0].hasOwnProperty('no_records'))
            {
              this.showNewFeedbackCards = "0";
            }
            else{
              if (objectlength > 11) {
          if (check[11].hasOwnProperty('feedback')) {
            this.showFeedbackCards = "1";
            this.feedback = check[11].feedback;
            if(check[11].feedback[0].hasOwnProperty('no_records'))
            {
              this.showFeedbackCards = "0";
            }
          }
        }
            }
          }
        }

      });
    }
  }

  public beforeChange($event: NgbPanelChangeEvent) {


    // if ($event.panelId === 'preventchange-2') {
    //   $event.preventDefault();
    // }

    // if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
    //   $event.preventDefault();
    // }
    if ($event.panelId === 'preventchange-4') {
      const reqpara3 = {
        requesttype: 'getambassadorposition',
        queueid: sessionStorage.getItem('QueueId'),
      }
      const amblink = JSON.stringify(reqpara3);
      // console.log(amblink);
      this._data.webServiceCall(amblink).subscribe(res => {
        this.link = res[0].ambassadorposition[0].iframe_link;
        // console.log(this.link);
      });
    }
  };
  clicked(event: Event) {
    event.preventDefault();
    // console.log("Clicked");
    event.stopPropagation();
  }

  toggle() {
    let control = this.pickCardForm.get('pickupAddress');
    control.disabled ? control.enable() : control.disable();
  }

}
