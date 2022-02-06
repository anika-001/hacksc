import { Component, OnInit } from '@angular/core';
import {ChartType} from 'chart.js';
import { Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  line: ChartType = 'line';
  activity = {
    Label: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'S'],
    Data: [32, 90, 80, 60, 100, 45, 67],
    Type: this.line
  };
  activity2 = {
    Label: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'S'],
    Data: [15, 80, 34, 84, 92, 45, 23],
    Type: this.line
  };
  activity3 = {
    Label: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'S'],
    Data: [89, 92, 27, 72, 23, 76, 33],
    Type: this.line
  };
  activity4 = {
    Label: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'S'],
    Data: [98, 60,51, 94, 44, 99, 32],
    Type: this.line
  };
  activity5 = {
    Label: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'S'],
    Data: [69, 42, 19, 78, 92, 58, 88],
    Type: this.line
  };

  ngOnInit(): void {
  }

}
