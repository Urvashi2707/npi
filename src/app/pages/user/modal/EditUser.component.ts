import { Component, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { ServerService } from '../../services/user.service';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'app-modal',
  templateUrl: './EditUser.component.html',
  styleUrls: ['./EditUser.component.scss']
})

export class EditUserComponent implements OnInit {

  public visible = false;
  private visibleAnimate = false;
  modalHeader: string;
  modalContent: any;
  message: any;
  showAnimation = '0';
  visible1 = false;
  SvcId: string;
  userList: any = [];
  Designation: any = [];
  userDisable:any;
  constructor(private titlecasePipe:TitleCasePipe,private activeModal: NgbActiveModal, private _data: ServerService) { }

  ngOnInit() {
    if(sessionStorage.getItem('selectedsvc')){
      this.SvcId = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.SvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    this.getUserType();
  }

  closeModal() {
    this.activeModal.close();
  }

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  //get user type
  getUserType() {
    const reqpara2 = {
        requesttype: 'getusertypes'
      }
    const as2 = JSON.stringify(reqpara2);
    this._data.webServiceCall(as2).subscribe
      (res => {
        this.Designation = res[0].usertype
      });
  }

  //get user list
  getUserList() {
    // this.SvcId = sessionStorage.getItem('svcid');
    console.log(this.SvcId);
    const reqpara1 ={
        requesttype: 'getuserlist',
        servicecentreid: JSON.parse(this.SvcId),
      }
    const as1 = JSON.stringify(reqpara1);
    this._data.webServiceCall(as1).subscribe
      (res => {
        console.log(res[0].userlist);
        this.userList = res[0].userlist;
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
  //on submit function call
  onSubmit(f: NgForm) {
    const reqpara = {
      requesttype: 'updateuser',
      useridvar: this.modalContent.id,
      username: this.titlecasePipe.transform(f.value.name),
      mobilenumber: f.value.mobile1,
      email: f.value.email,

      isenabled: 1,
      permissionid: f.value.permission
    };
    const ua = JSON.stringify(reqpara);
    this._data.webServiceCall(ua).subscribe(data => {
      if (data) {
        this.message = data
        console.log("message update");
        if(data[0].userupdate[0].update_status === "1"){
          console.log("update");
          // this.getUserList();
          this.visible = true;
          this.showAnimation = '1';
        }
        else{
          console.log(" not update");
          // this.getUserList();
          this.visible = true;
          this.showAnimation = '0';
        }
      }
   });
    // this.activeModal.close();
  }
}
