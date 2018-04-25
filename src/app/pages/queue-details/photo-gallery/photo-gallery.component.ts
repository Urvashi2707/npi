import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPhotoComponent } from './modal-photo/modal-photo.component';
import { NgbPanelChangeEvent, NgbTabContent } from '@ng-bootstrap/ng-bootstrap';
import { ListService } from '../../services/user.service';
import { QueueTableService } from '../../services/queue-table.service';
import { ThemeModule } from '../../../@theme/theme.module';
import { ModalSendLinkComponent } from '../modal-send-link/modal-send-link.component';
import { QueueDetailsComponent } from '../queue-details.component';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {

  dataToSend: any;
  tableData: any[];
  keyValues: any[];
  photoLink: String = 'http://m.21north.in:7410/images/';
  images: String[] = [];
  public showbutton = true;
  states: any[];
  keyForState: any[];

  pickCimages: String[] = []
  constructor(private modalService: NgbModal, private _data: ListService, private _detailsTable: QueueTableService) { }

  onViewerVisibilityChanged(img: any) {
    const activeModal = this.modalService.open(ModalPhotoComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalContent = this.tableData[img][this.keyValues[1]];

  }
  ngOnInit() {
    const reqpara3 = {
      requesttype: 'getimagestages',
      queueid: sessionStorage.getItem('QueueId'),
    }
    const as3 = JSON.stringify(reqpara3);
    this._data.createUser(as3).subscribe(res => {
      const valueOF = res;
      const check = valueOF.valueOf();
      const check1 = check[0];
      const check2 = ['imagestages'];
      this.states = check1[check2[0]];
      this.keyForState = ['state', 'stagename'];
      if(res[0].imagestages[0].hasOwnProperty('no_images'))
      {
        this.showbutton = false;
      }
    });
  }
  sendImages(){
    
      const activeModal = this.modalService.open(ModalSendLinkComponent, { size: 'lg', container: 'nb-layout' });
      sessionStorage.setItem('clickedOn', '20')
      activeModal.componentInstance.modalHeader = 'Send Images';
      activeModal.componentInstance.modalContent = sessionStorage.getItem('customerNo');
  }
  showLargeModal(name: string) {
    const activeModal = this.modalService.open(ModalPhotoComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Large Modal';
    activeModal.componentInstance.modalContent = name;
  }
  public beforeChange($event: NgbPanelChangeEvent) {
    const reqpara3 = {
      requesttype: 'getimages',
      queueid: sessionStorage.getItem('QueueId'),
      state: $event.panelId
    }
    this.dataToSend = JSON.stringify(reqpara3);
    console.log(this.dataToSend);
    this._data.createUser(this.dataToSend).subscribe(res => {
      const valueOF = res;
      const check = valueOF.valueOf();
      const check1 = check[0];
      const check2 = ['imagelist']
      this.tableData = check1[check2[0]];
      this.keyValues = ["id", "filename", "title"];
    });
  };
}
