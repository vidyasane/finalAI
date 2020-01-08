import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { startWith, switchMap } from "rxjs/operators";
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Apidata: any;
  tableData: any;
  columnHeadings: string[] = ['title', 'url', 'created_at', 'author'];
  modalRefData: any;
  rawJsonData: any;
  constructor(private http: HttpClient, private bsmService: BsModalService) { }

  ngOnInit(): void {
    this.getApiData();
  }

  getApiData() {
    interval(5000).pipe(startWith(0), switchMap(() => this.http.get("https://hn.algolia.com/api/v1/search_by_date?tags=story"))).subscribe(apiResponse => {
      this.Apidata = apiResponse;
      console.log("response from given API : ", this.Apidata);
      this.tableData = this.Apidata.hits;
    })
  }

  openModal(template, rowData) {
    this.modalRefData = this.bsmService.show(template);
    this.rawJsonData = rowData;
  }

}
