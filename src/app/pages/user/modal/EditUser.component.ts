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
  SvcId: string;
  userList: any = [];
  Designation: any = [];
  constructor(private titlecasePipe:TitleCasePipe,private activeModal: NgbActiveModal, private _data: ServerService) { }
  
  ngOnInit() {
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
    this.SvcId = localStorage.getItem('svcid')
    const reqpara1 ={
        requesttype: 'getuserlist',
        servicecentreid: JSON.parse(this.SvcId),
      }
    const as1 = JSON.stringify(reqpara1);
    this._data.webServiceCall(as1).subscribe
      (res => {
        console.log(res[0].userlist);
        this.userList = res[0].userlist;
      });
  }

  //delete user
  deleteUser() {
    const reqpara1 = {
      requesttype: 'updateuser',
      useridvar: this.modalContent.id,
      username: this.modalContent.first_name,
      mobilenumber: this.modalContent.mobilenumber,
      email: this.modalContent.email,
      permission: this.modalContent.designation,
      isenabled: 1
    };
    const ua1 = JSON.stringify(reqpara1);
    this._data.webServiceCall(ua1).subscribe(data => {
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
      isenabled: 0,
      permissionid: f.value.permission
    };
    const ua = JSON.stringify(reqpara);
    this._data.webServiceCall(ua).subscribe(data => {
      if (data) {
        this.message = data
        // this.show1 = true;
        this.getUserList()
      }
   });
    this.activeModal.close();
  }
}
