import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FormBusService {

  constructor(private db: AngularFirestore, private httpClient: HttpClient) { }

  onSubmit(formno: number, uid: string, formvalue: any, docid: string) {
    if (formno == 0) {
      console.log(formvalue);
    }

    else if (formno == 1) {
      this.db.collection("Workspaces").doc(uid).collection("Projects").add(formvalue);
    }

    else if (formno == 2) {
      this.db.collection("Workspaces").doc(uid).collection("Projects").doc(docid).collection("boards").add(formvalue);
    }

    else if (formno == 3) {
      let json = {
        "amount": Number(formvalue.amount),
        "currency": "INR",
        "reference_id": "Fundle111",
        "description": formvalue.description,
        "customer": {
          "name": formvalue.name,
          "contact": formvalue.phone_no,
          "email": formvalue.email
        },
        "notify": {
          "sms": false,
          "email": true
        },
        "reminder_enable": true,
      }
      console.log(json);
      this.httpClient.post<any>('https://fundle-backend.herokuapp.com/v1/fundle/request_Payment', { 'payload': json }, {

      }).subscribe(
        (res) => {
          console.log(res);

        },
        (err) => {
          console.log(err);

        }
      );
    }
  }
}
