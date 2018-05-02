import { Component, OnInit, Input, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import {User} from '../model/user';
import {ListService } from '../services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { SuccessComponent } from './success/success.component';
import { NgClass } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
  export class UserComponent implements OnInit {

      public isCollapsed = false
      show : false;
      model: User = new User();
      public designation: string[];
      public userList: any = [];
      public userDisable: any = [];
      public user = [];

      searchText:string;

      public svcid:string;
      isNewestOnTop = true;
      isHideOnClick = true;
      public salutation:any;
      isDuplicatesPrevented = false;
      isCloseButton = true;
      config: ToasterConfig;
      position = 'toast-top-full-width';
      animationType = 'fade';
      timeout = 5000;
      toastsLimit = 5;
      countrycode1:string;
      countrycode:string;
      svcadmin:string;
      checksvcadmin :boolean;
      checkgrpadmin :boolean;
      groupadmin:string;

      key: string = 'id'; 
      reverse: boolean = false;

      constructor(private toasterService: ToasterService,
                    private modalService: NgbModal,
                    private _data:ListService,
                    private titlecasePipe:TitleCasePipe) {}


      ngOnInit() {
        if(sessionStorage.getItem('selectedsvc')){
          // console.log(sessionStorage.getItem('selectedsvc'));
          this.svcid = sessionStorage.getItem('selectedsvc');
          // console.log(this.svcid);
        }
        else{
          this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
          // console.log(this.svcid);
        }
        this._data.getUser().subscribe(data => this.user = data);
        this. getUserType();

        // this.getUserList();

        this.countrycode1="+91";
        this.svcadmin = JSON.parse(sessionStorage.getItem('svcadmin'));
        console.log(this.svcadmin);
        this.groupadmin = JSON.parse(sessionStorage.getItem('groupadmin'));
        console.log(this.groupadmin);
        if(this.svcadmin == "1"){
          this.checksvcadmin = true;
        }
        else{
          this.checksvcadmin = false;
        }
        if(this.groupadmin == "1"){
          this.checkgrpadmin = true;
        }
        else{
          this.checkgrpadmin = false;
        }
        this.salutation = [
          { id: 1, type: 'Mr' },
          { id: 2, type: 'Mrs' },
          { id: 3, type: 'Ms' },
        ];
       }


       sort(key){
        this.key = key;
        this.reverse = !this.reverse;
      }


       private showToast(type: string, title: string, body: string) {
        this.config = new ToasterConfig({
          positionClass: this.position,
          timeout: this.timeout,
          newestOnTop: this.isNewestOnTop,
          tapToDismiss: this.isHideOnClick,
          preventDuplicates: this.isDuplicatesPrevented,
          animation: this.animationType,
          limit: this.toastsLimit,
        });
        const toast: Toast = {
          type: type,
          title: title,
          body: body,
          timeout: this.timeout,
          showCloseButton: this.isCloseButton,
          bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);
      }

      closeResult: string;

      showLargeModal(res:any) {
        const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = 'Edit Users';
        activeModal.componentInstance.modalContent = res;
      }
      success(res:any) {
        const activeModal = this.modalService.open(SuccessComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = 'Message';
        activeModal.componentInstance.modalContent = res;
      }
    //   popToast() {
    //     this.toasterService.pop('success', 'Args Title', 'Args Body');
    // }

      delete(user){
        const reqpara1 = {
          requesttype: 'updateuser',
          useridvar: user.id,
          username: user.first_name,
          mobilenumber: user.mobilenumber,
          email:user.email,
          designation:user.permission_type,
          isenabled:0
        };
        console.log(JSON.stringify(reqpara1));
        const ua1 = JSON.stringify(reqpara1);
        this._data.updateUser(ua1).subscribe(data => {
          console.log(data);
          window.location.reload();
          
        });
      }

      getUserType()
      {
        const reqpara2 = 
        {
          requesttype: 'getusertypes'
        }
          const as2 = JSON.stringify(reqpara2);
             this._data.getUserType(as2).subscribe
        (res => 
          {
            this.designation = res[0].usertype
            console.log(res[0]);
          }
        );
      }

      getUserList()
      {
        const reqpara1 = 
        {
          requesttype: 'getuserlist',
          servicecentreid:this.svcid,
        }
          const as1 = JSON.stringify(reqpara1);
             this._data.getUserType(as1).subscribe
        (res => 
          {
            for(var i = 0; i < res[0].userlist.length; i++ ){
              if(res[0].userlist[i].isenabled == '1'){
              this.userList.push(res[0].userlist[i])
             
              }
            
            else{
              this.userDisable.push(res[0].userlist[i])
             
            }
            
          }
          console.log(this.userList);
          console.log(this.userDisable);
        }
        );
      }

      tabChanged(tabData: any){
        if (tabData.tabTitle == "User List"){
          const reqpara1 = 
          {
            requesttype: 'getuserlist',
            servicecentreid:this.svcid,
          }
            const as1 = JSON.stringify(reqpara1);
               this._data.getUserType(as1).subscribe
          (res => 
            {
              for(var i = 0; i < res[0].userlist.length; i++ ){
                if(res[0].userlist[i].isenabled == '1'){
                this.userList.push(res[0].userlist[i])
               
                }
              
              else{
                this.userDisable.push(res[0].userlist[i])
               
              }
              
            }
            console.log(this.userList);
            console.log(this.userDisable);
          }
          );
        }

        else if (tabData.tabTitle == "Enabled User"){
          const reqpara1 = 
        {
          requesttype: 'getuserlist',
          servicecentreid:this.svcid,
        }
          const as1 = JSON.stringify(reqpara1);
             this._data.getUserType(as1).subscribe
        (res => 
          {
            for(var i = 0; i < res[0].userlist.length; i++ ){
              if(res[0].userlist[i].isenabled == '1'){
              this.userList.push(res[0].userlist[i])
             
              }
            
            else{
              this.userDisable.push(res[0].userlist[i])
             
            }
            
          }
          console.log(this.userList);
          console.log(this.userDisable);
        }
        );
        }

      }

      enableuser(user1){
        const reqpara1 = {
          requesttype: 'updateuser',
          useridvar: user1.id,
          username: user1.first_name,
          mobilenumber: user1.mobilenumber,
          email:user1.email,
          designation:user1.permission_type,
          isenabled:1
        };
        console.log(JSON.stringify(reqpara1));
        const ua1 = JSON.stringify(reqpara1);
        this._data.updateUser(ua1).subscribe(data => {
          console.log(data);
         
        });
      }

      onSubmit(f: NgForm) {
        console.log(f.value.code);
        console.log (this.titlecasePipe.transform(f.value.name))
        const reqpara3 = {
          requesttype:'createuser',
          servicecentreid:this.svcid,
          usertype:f.value.desgination,
          username:this.titlecasePipe.transform(f.value.name),
          mobilenumber:f.value.mobile1,
          email:f.value.email
        }
        const as3 = JSON.stringify(reqpara3);
        this._data.createUser(as3).subscribe(res =>{
          console.log(res);
         
          if(res[0].userexists[0].does_exist == 0){
            console.log('created');
            this.success("0");
            // f.reset();
            f.controls.name.reset();
            f.controls.desgination.reset();
            f.controls.mobile1.reset();
            f.controls.email.reset();
            f.controls.salutation1.reset();
            // f.reset({ countrycode1: this.countrycode1 });
            // f.value.code = "+91";
            // console.log( f.value.code );
            // this.countrycode1="+91";
          }
          else if (res[0].userexists[0].does_exist == 1){
            console.log('not created');
            this.success("1");
            f.controls.name.reset();
            // f.reset();
            // f.setValue
            // f.reset({ code: "+91" });
            // this.countrycode1="+91";
            // f.value.code = "+91";
          }
          });
          // this.countrycode1="+91";
          // f.value.code = "+91";
           }

      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }
  }
