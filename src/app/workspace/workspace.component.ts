import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBase } from '../form-template/form-base';
import { TextboxField } from '../form-template/form-textbox';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  metadata: any = {"brief": "", "project_name": ""};
  constructor(private route: ActivatedRoute, private router: Router, private db: AngularFirestore, private as: AuthService, private fb: FormBuilder) { }

  boards: FormBase<string>[] = [

    new TextboxField({
      key: 'board_name',
      label: 'Board Name',
      required: true,
    }),

  ];

  allboards: any;
  notes: Array<Array<any>> = [];
  form = new FormGroup({
      boards: new FormArray([])
    });

  wId: any;
  userID: any;
  popup: boolean = false;
  ngOnInit(): void {
    this.wId = this.route.snapshot.queryParams['id'];
    this.as.getUserState()
    .subscribe(user => {
      if(user == null){this.router.navigate(['/signin'])}
      this.userID = user.uid;
      this.getMetadata();
      this.getBoards();
    })
    
  }

  addBoardsFormGroup() {
    return new FormGroup({
      content: new FormControl(['']),
    });
  }

  getboards() {
    return (this.form.get('boards') as FormArray).controls;
  }

  // addBoards() {
  //   let boardForm = new FormGroup({
  //     content: new FormControl(['', Validators.required]),
  //   });
  //   this.boards.push(boardForm);
  //   console.log(this.boards);
  // }

  addBoardsButton() {
    (<FormArray>this.form.get('boards')).push(this.addBoardsFormGroup());
  }

  getBoards(){
    this.db.collection("Workspaces").doc(this.userID).collection("Projects").doc(this.wId).collection("boards").snapshotChanges().subscribe(res => {
      this.allboards = res;
      console.log(this.allboards.length);
      (<FormArray>this.form.get('boards')).clear();
      this.notes = [];
      this.getnotes();
      for(let i of this.allboards){
        this.addBoardsButton();
      }
    })
  }

  getnotes(){
    this.notes = [];
    for(let i of this.allboards){
      this.db.collection("Workspaces").doc(this.userID).collection("Projects").doc(this.wId).collection("boards").doc(i.payload.doc.id).collection("Notes").snapshotChanges().subscribe(res => {
        console.log("Hellew")
        console.log(res, this.notes);
        this.notes.push(res);
      })
    }
  }

  newboard(){
    this.popup = true;
  }

  addanote(id, ind){
    this.db.collection("Workspaces").doc(this.userID).collection("Projects").doc(this.wId).collection("boards").doc(id).collection("Notes").add((<FormArray>this.form.get('boards')).controls[ind].value).then(res => {
      (<FormArray>this.form.get('boards')).controls[ind].get("content").setValue("");
      this.getnotes();
    });
  }

  getMetadata(){
    this.db.collection("Workspaces").doc(this.userID).collection("Projects").doc(this.wId).snapshotChanges().subscribe(res => {
      this.metadata = res;
      // console.log(this.projects[0].payload.doc.data());
    })
  }



}
