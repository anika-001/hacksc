import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBase } from '../form-template/form-base';
import { FormControlServiceService } from '../form-template/form-control-service.service';
import { AuthService } from '../services/auth.service';
import { FormBusService } from '../services/form-bus.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() questions: FormBase<string>[] | null = [];
  @Input() value: number;
  @Input() name: string;
  @Input() docid: string;
  @Output() onSubmitEmit: EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;
  payLoad = '';
  userID: any;

  constructor(private fcs: FormControlServiceService, private fb: FormBusService, private as: AuthService) {}

  ngOnInit() {
    this.form = this.fcs.toFormGroup(this.questions as FormBase<string>[]);
    this.as.getUserState()
    .subscribe(user => {
      this.userID = user.uid;
    })
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    // this.fb.onSubmit(0, this.form.value);
     console.log(this.value, this.userID, this.form.value, this.docid);
    this.fb.onSubmit(this.value, this.userID, this.form.value, this.docid);
  }

}
