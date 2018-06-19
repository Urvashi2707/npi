import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { ListService } from '../../services/user.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public visible = false;
  private visibleAnimate = false;
  modalHeader: string;
  modalContent: any;
  service_type: string;
  public user: any;
  public message: any;
  public show1 = false;
  disable = true;
  isNewestOnTop = true;
  isHideOnClick = true;
  svcid: string;
  userList: any = [];
  isDuplicatesPrevented = false;
  isCloseButton = true;
  config: ToasterConfig;
  position = 'toast-top-full-width';
  animationType = 'fade';
  title = 'HI there!';
  content = `I'm cool toaster!`;
  timeout = 5000;
  toastsLimit = 5;
  type = 'default';
  public designation: any = [];
  constructor(private titlecasePipe:TitleCasePipe,private toasterService: ToasterService, private activeModal: NgbActiveModal, private _data: ListService) { }
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
  getUserType() {
    const reqpara2 =
      {
        requesttype: 'getusertypes'
      }
    const as2 = JSON.stringify(reqpara2);
    this._data.webServiceCall(as2).subscribe
      (res => {
        this.designation = res[0].usertype
        console.log(res[0]);
      }
      );
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
  getUserList() {
    this.svcid = localStorage.getItem('svcid')
    console.log(this.svcid);
    const reqpara1 =
      {
        requesttype: 'getuserlist',
        servicecentreid: JSON.parse(this.svcid),
      }
    const as1 = JSON.stringify(reqpara1);
    this._data.webServiceCall(as1).subscribe
      (res => {
        console.log(res[0].userlist);
        this.userList = res[0].userlist;
      }
      );
  }

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
    console.log(JSON.stringify(reqpara1));
    const ua1 = JSON.stringify(reqpara1);
    this._data.webServiceCall(ua1).subscribe(data => {
      console.log(data);
    });
  }
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
    console.log(JSON.stringify(reqpara));
    const ua = JSON.stringify(reqpara);
    this._data.webServiceCall(ua).subscribe(data => {
      if (data) {
        console.log(data);
        this.message = data
        this.show1 = true;
        this.getUserList()
      }

    });
    this.activeModal.close();
  }
}
