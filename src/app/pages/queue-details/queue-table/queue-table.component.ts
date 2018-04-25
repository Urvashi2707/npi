import { Component, OnInit } from '@angular/core';
import { QueueTableService } from '../../services/queue-table.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-queue-table',
  templateUrl: './queue-table.component.html',
  styleUrls: ['./queue-table.component.scss']
})
export class QueueTableComponent implements OnInit {

  sms_calls_headings: String[] = ['Date', 'Time', 'SMS/Calls', 'From', 'To', 'Content'];
  history_headings: String[] = ['Date', 'Time', 'Action', 'Action By'];
  ticket_headings: String[] = ['Date', 'Time', 'Ambassador Name', 'Ticket'];
  dataFromService: any;
  tableData: any[];
  keyValues: any[];
  constructor(private _tableService: QueueTableService) {

    this._tableService.clickedID.subscribe(value => {
      if (value == 1) {
        this.dataFromService = value;
        this.tableData = _tableService.table_data;
        this.keyValues = ['com_date', 'com_time', 'com_type', 'com_from', 'com_to', 'message'];

      }
      else if(value == 2) {
        this.dataFromService = value;
        this.tableData = _tableService.table_data;
        this.keyValues = ['action_date', 'action_time', 'action_performed', 'action_by'];
 
      }else if(value == 12){
        this.dataFromService = value;
        this.tableData = _tableService.table_data;
        this.keyValues = ['ticket_date', 'ticket_time', 'first_name', 'ticket'];

      }
    });
  }

  ngOnInit() {

  }

}
