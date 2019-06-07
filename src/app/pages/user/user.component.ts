import { Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {ServerService } from '../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import { EditUserComponent } from './modal/EditUser.component';
import { SuccessComponent } from './success/success.component';
import { TitleCasePipe } from '@angular/common';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
  export class UserComponent implements OnInit {

      model: User = new User();
      Designation: string[];
      userList: any = [];
      userDisable: any = [];
      user: any = {};
      SearchData:string;
      SvcID:string;
      salutation:any;
      CountryCode:string;
      SvcAdmin:string;
      InsuranceUsr:string;
      InsuranceCheck:boolean = false;
      CheckSvcAdmin :boolean;
      CheckGrpAdmin :boolean;
      GroupAdmin:string;
      key: string = 'id';
      reverse: boolean = false;
      maxLen: any;

      constructor(private modalService: NgbModal,
                    private _data:ServerService,
                    private titlecasePipe:TitleCasePipe) {}


      ngOnInit() {
        this.InsuranceUsr = JSON.parse(sessionStorage.getItem('insurance'));
        if(sessionStorage.getItem('selectedsvc')){
          this.SvcID = sessionStorage.getItem('selectedsvc');
        }
        else{
          this.SvcID = JSON.parse(sessionStorage.getItem('globalsvcid'));
        }
        this. getUserType();
        if(this.InsuranceUsr == "1"){
          this.InsuranceCheck = true;
        }
        if(sessionStorage.getItem('loginCountryFlag') === '2') {
          this.maxLen = '8';
          this.CountryCode="+65";
          console.log("this.maxLen ", this.maxLen);
        }
        if(sessionStorage.getItem('loginCountryFlag') === '1') {
          this.maxLen = '10';
          this.CountryCode="+91";
          console.log("this.maxLen ", this.maxLen);
        }
       else{
        this.InsuranceCheck = false;
       }
        this.SvcAdmin = JSON.parse(sessionStorage.getItem('svcadmin'));
        this.GroupAdmin = JSON.parse(sessionStorage.getItem('groupadmin'));
        if(this.SvcAdmin == "1"){
          this.CheckSvcAdmin = true;
        }
        else{
          this.CheckSvcAdmin = false;
        }
        if(this.GroupAdmin == "1"){
          this.CheckGrpAdmin = true;
        }
        else{
          this.CheckGrpAdmin = false;
        }
        this.salutation = [
          { id: 1, type: 'Mr' },
          { id: 2, type: 'Mrs' },
          { id: 3, type: 'Ms' },
        ];
        this.user.salutation = 'Mr';
       }


       //Sort Function
       sort(key){
        this.key = key;
        this.reverse = !this.reverse;
      }

      //LargeModal
      showLargeModal(res:any) {
        const activeModal = this.modalService.open(EditUserComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = 'Edit Users';
        activeModal.componentInstance.modalContent = res;
        activeModal.result.then(() => {
          console.log('When user closes');
          this.getUserList();
        }, () => { console.log('Backdrop click')})
      }

      //Success Modal
      success(res:any) {
        const activeModal = this.modalService.open(SuccessComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = 'Message';
        activeModal.componentInstance.modalContent = res;
      }

      //Delete User
      Delete(user,index){
        const reqpara1 = {
          requesttype: 'updateuser',
          useridvar: user.id,
          username: user.first_name,
          mobilenumber: user.mobilenumber,
          email:user.email,
          isenabled:0,
          designation:user.permission_type
          };
        const ua1 = JSON.stringify(reqpara1);
        this._data.webServiceCall(ua1).subscribe(data => {
          this.userList= [];
          this.userDisable = [];
          this.DisableUser(index);
        });
      }

      //get User type
      getUserType(){
        const UserType = {
          requesttype: 'getusertypes'
        }
          const UserReq = JSON.stringify(UserType);
             this._data.webServiceCall(UserReq).subscribe
        (res => {
            this.Designation = res[0].usertype;
          });
      }

      //Function called on change of tab
      tabChanged(tabData: any){
        this.userDisable = [];
        this.userList = [];
        if (tabData.tabTitle == "User List"){
        const List = {
            requesttype: 'getuserlist',
            servicecentreid:this.SvcID,
          }
            const ListReq = JSON.stringify(List);
               this._data.webServiceCall(ListReq).subscribe
          (res =>  {
              for(var i = 0; i < res[0].userlist.length; i++ ){
                if(res[0].userlist[i].isenabled == '1'){
                this.userList.push(res[0].userlist[i])
              }
            else{
                this.userDisable.push(res[0].userlist[i])
              }
            }
          });
        }
      else if (tabData.tabTitle == "Disabled User"){
          this.userDisable = [];
          this.userList = [];
          const List1 =  {
          requesttype: 'getuserlist',
          servicecentreid:this.SvcID,
        }
          const ListReq1 = JSON.stringify(List1);
             this._data.webServiceCall(ListReq1).subscribe
        (res =>  {
            for(var i = 0; i < res[0].userlist.length; i++ ){
              if(res[0].userlist[i].isenabled == '1'){
              this.userList.push(res[0].userlist[i])
             }
            else{
              this.userDisable.push(res[0].userlist[i])
            }
          }
        });
        }
      }

      getUserList(){
        this.userList = [];
        this.userDisable = [];
        const List1 = {
          requesttype: 'getuserlist',
          servicecentreid:this.SvcID,
        }
          const ListReq1 = JSON.stringify(List1);
             this._data.webServiceCall(ListReq1).subscribe
        (res =>  {
            for(var i = 0; i < res[0].userlist.length; i++ ){
              if(res[0].userlist[i].isenabled == '1'){
              this.userList.push(res[0].userlist[i])
            }
          else{
              this.userDisable.push(res[0].userlist[i])
            }
          }
        });
      }

      //function for unable user
      EnableUser(user1,index){
        const UpdateUsr = {
          requesttype: 'updateuser',
          useridvar: user1.id,
          username: user1.first_name,
          mobilenumber: user1.mobilenumber,
          email:user1.email,

          isenabled:1,
          permissionid:user1.permission_type,
        };
        const UpdateReq = JSON.stringify(UpdateUsr);
        this._data.webServiceCall(UpdateReq).subscribe(data => {
          this.userDisable = [];
          this.userList = [];
          this.EnableUserindex(index);
         });
      }

      //get list of user
      DisableUser(index){
        console.log(index);
        this.userDisable = [];
        this.userList = [];
        const UsrDisable = {
          requesttype: 'getuserlist',
          servicecentreid:this.SvcID,
        }
          const Disabledreq = JSON.stringify(UsrDisable);
             this._data.webServiceCall(Disabledreq).subscribe
        (res => {
            for(var i = 0; i < res[0].userlist.length; i++ ){
              if(res[0].userlist[i].isenabled == '1'){
              this.userList.push(res[0].userlist[i])
              // this.userDisable.splice(index,1);
            }
           else{
              this.userDisable.push(res[0].userlist[i]);
              this.userDisable.splice(index,1);
            }
          }
        });
      }

      EnableUserindex(index){
        console.log(index);
        this.userDisable = [];
        this.userList = [];
        const UsrDisable = {
          requesttype: 'getuserlist',
          servicecentreid:this.SvcID,
        }
          const Disabledreq = JSON.stringify(UsrDisable);
             this._data.webServiceCall(Disabledreq).subscribe
        (res => {
            for(var i = 0; i < res[0].userlist.length; i++ ){
              if(res[0].userlist[i].isenabled == '1'){
              this.userList.push(res[0].userlist[i])
              this.userList.splice(index,1);
            }
           else{
              this.userDisable.push(res[0].userlist[i]);
              // this.userDisable.splice(index,1);
            }
          }
        });
      }

      //create user function
      onSubmit(f: NgForm) {
        const CreatePara = {
          requesttype:'createuser',
          servicecentreid:this.SvcID,
          usertype:f.value.desgination,
          username:this.titlecasePipe.transform(f.value.name),
          mobilenumber:f.value.mobile1,
          email:f.value.email
        }
        const createreq = JSON.stringify(CreatePara);
        this._data.webServiceCall(createreq).subscribe(res =>{
          if(res[0].userexists[0].does_exist == 0){
            this.success("0");
            f.controls.name.reset();
            f.controls.desgination.reset();
            f.controls.mobile1.reset();
            f.controls.email.reset();
            f.controls.salutation1.reset();
          }
          else if (res[0].userexists[0].does_exist == 1){
            this.success("1");
            f.controls.name.reset();
            f.reset();
          }
          });
          }

  }
