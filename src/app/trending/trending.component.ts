import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tools } from '../JSONData/tool';
import { FormBase } from '../form-template/form-base';
import { TextboxField } from '../form-template/form-textbox';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  myTimeline: any;

  tools: any;
  proj: any;
  projpopup: boolean;
  collabpopup: boolean;
  userID: any;
  projects: Array<any> = [];
  
  constructor(private httpClient: HttpClient) { }
  Collaboration: FormBase<string>[] = [

    new TextboxField({
      key: 'Company Name',
      label: 'Comapany Name',
      required: true,
    }),

    new TextboxField({
      key: 'Brief',
      label: 'Brief',
      required: true,
      // type: 'email',
    })
  ];
  ngOnInit(): void {
    this.getTwitterTrending();
    this.tools = tools;
    // this.proj = projects;
    this.projpopup = false;
    this.collabpopup = false;
  }

  getTwitterTrending() {

    this.httpClient.get<any>('https://fundle-backend.herokuapp.com/v1/fundle/trending', {

    }).subscribe(
      (res) => {
        console.log(res);
        console.log(res[0].trends[0]);
        this.myTimeline=res[0].trends;

      },
      (err) => {
        console.log(err);

      }
    );
  }
}
