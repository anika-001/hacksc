import { Component, OnInit } from '@angular/core';
import { FormBase } from '../form-template/form-base';
import { TextboxField } from '../form-template/form-textbox';
import { tools2 } from '../JSONData/tool';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { query } from '@angular/animations';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  tools: any;
  invpopup: boolean;
  reqpopup: boolean;
  Dasboard: boolean;
  Requested: boolean;
  Payments: boolean;
  pay:any;
  error:any;

  invoice: any;
  userID: any;
  downloadUrl: any;
  date: any;
  compname: any;
  Inv: any;


  constructor(private httpClient: HttpClient, private as: AuthService, private db: AngularFirestore, private router: Router, private storage: AngularFireStorage) { }
  Requests: FormBase<string>[] = [

    new TextboxField({
      key: 'name',
      label: 'Request payment from',
      required: true,
    }),

    new TextboxField({
      key: 'email',
      label: 'Email',
      required: true,
      type: 'email',
    }),
    new TextboxField({
      key: 'amount',
      label: 'Amount',
      required: true,
      type: 'number',
    }),
    new TextboxField({
      key: 'phone_no',
      label: 'Phone Number',
      required: true,
      type: 'number',
    }),
    new TextboxField({
      key: 'description',
      label: 'Description',
      // required: true,
      // type: 'email',
    })

  ];
  //  Invoices: FormBase<string>[] = [

  //     new TextboxField({
  //       key: 'CompanyName',
  //       label: 'Company Name',
  //       required: true,
  //     }),

  //     new TextboxField({
  //       key: 'Date',
  //       label: 'Date',
  //       required: true,
  //       type: 'date',
  //     }),
  //     new TextboxField({
  //       key: 'Upload File',
  //       label: 'Upload File',
  //       required: true,
  //       type: 'file',
  //     }),
  // ];

  forminvoices = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    this.tools = tools2;
    this.invpopup = false;
    this.Dasboard = true;
    this.Requested = false;
    this.Payments = false;
    this.reqpopup = false;

    this.getpayments();
    this.as.getUserState()
      .subscribe(user => {
        if (user == null) { this.router.navigate(['/signin']) }
        this.userID = user.uid;
        this.getInvoices();
        // this.getProjects();
      })
  }
  addinvoices() {
    this.invpopup = true;
    this.reqpopup =false;
  }
  addrequests()
  {
    this.invpopup = false;
    this.reqpopup = true;
  }
  submit() {
    
    console.log(this.forminvoices.value);
    // const path = `${this.userID}/invoice/${this.invoice.name}`;
    const path = `Invoices/${this.invoice.name}`;
    const dbpath = `Invoices/${this.userID}/invoice`
    const ref = this.storage.ref(path);
    // this.compname = name;
    // this.date = date;
    this.storage.upload(path, this.invoice).then(
      ress => {
        ref.getDownloadURL().subscribe(res => {
          console.log(res);
          this.db.collection(dbpath).add({ Company_name: this.forminvoices.value.name, Date: this.forminvoices.value.date, Link: res, uid: this.userID }).then(e => {
            // 
            console.log(e)
            this.router.navigate(['/invoices'])
          }).
            catch(e => { console.log(e) });
        })

      });
      this.invpopup = false;
      this.reqpopup = false;
  }
  uploadinvoice(event: Event) {
    let files: FileList = event.target["files"];
    this.invoice = files.item(0);
    console.log(this.invoice);
  }
  getInvoices() {
    this.db.collection("Invoices").doc(this.userID).collection("invoice").snapshotChanges().subscribe(response => {
      this.Inv = response;
      console.log(response);
      console.log(this.Inv[0].payload.doc.data());
    })

  }
  dashboard(){
    this.invpopup = false;
    this.Dasboard = true;
    this.Requested = false;
    this.Payments = false;
    this.reqpopup = false;
  }
  requested()
  {
    this.invpopup = false;
    this.Dasboard = false;
    this.Requested = true;
    this.Payments = false;
    this.reqpopup = false;
  }
  payments()
  {
    this.invpopup = false;
    this.Dasboard = false;
    this.Requested = false;
    this.Payments = true;
    this.reqpopup = false;
  }

  callfunc(i: any) {
    if (i == 0) {
      this.dashboard();
    }
    else {
      if (i == 1) {
        this.requested();
      }
      else {
        if (i == 2) {
          this.payments();
        }
        else {
          if (i == 3) {
            this.addinvoices();
          }
          else {
            this.addrequests();
          }
        }
      }
    }
  }

  getpayments(){
    this.httpClient.get<any>('https://fundle-backend.herokuapp.com/v1/fundle/get_Payment').subscribe(
      (res)=>{
        console.log(res);
        this.pay = res;
        this.pay = this.pay["payment_links"]
        console.log(this.pay)
      },
      (err) => {
        this.error = err;
      }
    )
  }
}
