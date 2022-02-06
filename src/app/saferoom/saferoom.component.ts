import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { tools3 } from '../JSONData/tool'
import { safedata } from '../JSONData/safedata'

@Component({
  selector: 'app-saferoom',
  templateUrl: './saferoom.component.html',
  styleUrls: ['./saferoom.component.scss']
})
export class SaferoomComponent implements OnInit {

  tools: any;
  safedata:any;
  rooms: boolean;
  forum: boolean;
  mood: boolean;
  // diary: boolean;

  thread: any = "";
  comments: any;
  allthreads: any = [];
  user: any;

  constructor(private as: AuthService, private router: Router, private db: AngularFirestore) { }
  ngOnInit(): void {
    this.tools = tools3;
    this.safedata=safedata;
    this.rooms = false;
    this.forum = true;
    this.mood = false;
    // this.diary = false;

    this.getthreads();
    this.as.getUserState().subscribe(user => {
      if(user == null) {this.user = null}
      else{
        this.user = user;
        this.as.getprofile(user.uid).subscribe((res:any) => {
          this.user["name"] = res.payload.data().name;
        })
        
      }
      
    })
  }

  callfunc(i: any) {
    if (i == 0) {
      this.roomspopup();
    }
    else {
      if (i == 1) {
        this.forumpopup();
      }
      else {
      
         this.moodpopup();
        
      }
    }
  }
  roomspopup() {
    this.rooms = true;
    this.forum = false;
    this.mood = false;
    // this.diary = false;
  }
  forumpopup() {
    this.rooms = false;
    this.forum = true;
    this.mood = false;
    // this.diary = false;
  }
  moodpopup() {
    this.rooms = false;
    this.forum = false;
    this.mood = true;
    // this.diary = false;
  }
  // diarypopup() {
  //   this.rooms = false;
  //   this.forum = false;
  //   this.mood = false;
  //   this.diary = true;
  // }

  threadform = new FormGroup({newth: new FormControl()})
  replyform = new FormGroup({replyin: new FormControl()})

  getthreads(){
    this.db.collection("Threads").snapshotChanges().subscribe(res => {
      this.allthreads = res;
    })
  }

  showthread(thread: any){
    this.thread = thread; 
    this.getthread();
  }
  addthread(){
    if(this.user == null){
      this.router.navigate(['/login']);
    }
    else{
      this.db.collection("Threads").add({"madeby": this.user.name, "uid": this.user.uid, "topic": this.threadform.get("newth").value}).then(res => {
        this.threadform.get("newth").setValue("");
      });
    }
  }

  addthreadAnon(){
    if(this.user == null){
      this.router.navigate(['/login']);
    }
    else{
      this.db.collection("Threads").add({"madeby": "Anonymous", "uid": this.user.uid, "topic": this.threadform.get("newth").value}).then(res => {
        this.threadform.get("newth").setValue("");
      });
    }
  }

  getthread(){
      this.db.collection("Threads").doc(this.thread.payload.doc.id).collection("comments").snapshotChanges().subscribe(res => {
        this.comments = res;
    })
  }
  reply(){
    if(this.user == null){
      this.router.navigate(['/login']);
    }
    else{
      this.db.collection("Threads").doc(this.thread.payload.doc.id).collection("comments").add({"uid": this.user.uid, "comment": this.replyform.get("replyin").value, "name": this.user.name}).then(res => {
        this.replyform.get("replyin").setValue("");
      });
    }
  }

  replyAnon(){
    if(this.user == null){
      this.router.navigate(['/login']);
    }
    else{
      this.db.collection("Threads").doc(this.thread.payload.doc.id).collection("comments").add({"uid": this.user.uid, "comment": this.replyform.get("replyin").value, "name": "Anonymous"}).then(res => {
        this.replyform.get("replyin").setValue("");
      });
    }
  }
}
