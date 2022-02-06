import { Component, OnInit } from '@angular/core';
import { tools } from '../JSONData/tool';
// import { projects } from '../JSONData/projects';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBase } from '../form-template/form-base';
import { TextboxField } from '../form-template/form-textbox';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.component.html',
  styleUrls: ['./workspaces.component.scss']
})
export class WorkspacesComponent implements OnInit {

  tools: any;
  proj: any;
  projpopup: boolean;
  collabpopup: boolean;
  userID: any;
  projects: Array<any> = [];

  constructor(private router: Router, private as: AuthService, private db: AngularFirestore) { }
  Projects: FormBase<string>[] = [

    new TextboxField({
      key: 'project_name',
      label: 'Project Name',
      required: true,
    }),

    new TextboxField({
      key: 'brief',
      label: 'Brief',
      required: true,
      // type: 'email',
    })
  ];
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

    this.as.getUserState()
    .subscribe(user => {
      if(user == null){this.router.navigate(['/signin'])}
      this.userID = user.uid;
      this.getProjects();
    })

    this.tools = tools;
    // this.proj = projects;
    this.projpopup = false;
    this.collabpopup = false;
  }
  form = new FormGroup({
    Projectname: new FormControl(''),
    Info: new FormControl(''),

  })
  addprojs() {
    this.projpopup = true;
    this.collabpopup = false;
    console.log("Project added");
  }
  addcollabs() {
    this.projpopup = false;
    this.collabpopup = true;
    console.log("Collab added")
  }
  Submit(){
    console.log(this.form.value);
    this.projpopup = false;
    this.collabpopup = false;
  }

  getProjects(){
    this.db.collection("Workspaces").doc(this.userID).collection("Projects").snapshotChanges().subscribe(res => {
      this.projects = res;
      console.log(this.projects[0].payload.doc.data());
    })
  }

  toWorkspace(docid: string){
    this.router.navigate(['/workspace'], { queryParams: { id: docid } })
  }
}
