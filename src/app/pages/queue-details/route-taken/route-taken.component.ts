import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/user.service'

@Component({
  selector: 'app-route-taken',
  templateUrl: './route-taken.component.html',
  styleUrls: ['./route-taken.component.scss']
})
export class RouteTakenComponent implements OnInit {

  pickup:string;
  dropoff:string;
  constructor(private _data: ServerService) { }

  ngOnInit() {
    const reqpara3 = {
      requesttype: 'getambassadorposition',
      queueid: sessionStorage.getItem('QueueId'),
    }
    const as3 = JSON.stringify(reqpara3);
    this._data.webServiceCall(as3).subscribe(res => {
      if(res[0].ambassadorposition.length == 0){
        console.log("no amb position");
      }
      else if(res[0].ambassadorposition[0].hasOwnProperty('iframe_link')){
        this.pickup = res[0].ambassadorposition[0].iframe_link;
        // this.dropoff = res[0].ambassadorposition[1].iframe_link;
      }
      else if(res[0].ambassadorposition[1].hasOwnProperty('iframe_link')){
        // this.pickup = res[0].ambassadorposition[0].iframe_link;
        this.dropoff = res[0].ambassadorposition[1].iframe_link;
      }
    });
  }

}
