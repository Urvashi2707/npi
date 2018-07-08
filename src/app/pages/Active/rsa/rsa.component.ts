import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { QueueTableService } from '../../services/queue-table.service';
import { ServerService } from '../../services/user.service';

@Component({
  selector: 'app-rsa',
  templateUrl: './rsa.component.html',
  styleUrls: ['./rsa.component.scss']
})
export class RsaComponent implements OnInit {

  pickup_headings: String[] = ['ID', 'License Plate', 'Drop-off', 'Pickup Date', 'ETD', 'Amount Paid/Unpaid', 'Status', 'Upload'];
  tableData: any[];
  keyValues: any[];

  constructor(private _detailsTable: QueueTableService, private _data: ServerService, private _tableService: QueueTableService) { 
    this._tableService.clickedID.subscribe(value => {
      this.tableData = _tableService.table_data;
      this.keyValues = Object.keys(this.tableData[0]);
    });
  }

  ngOnInit() {
    const reqpara3 = {
      requesttype: 'getqueueinfo',
      servicetype: '1'
    }
    const as3 = JSON.stringify(reqpara3);
    console.log(as3);
    this._data.webServiceCall(as3).subscribe(res => {
      this._detailsTable.setTableData(res, 6);
    });
  }

}
