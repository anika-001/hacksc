import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';

import { AngularFireModule } from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavdrawerComponent } from './navdrawer/navdrawer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkspacesComponent } from './workspaces/workspaces.component';
import { FormComponent } from './form/form.component';
import { FormTemplateComponent } from './form-template/form-template.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WorkspaceComponent } from './workspace/workspace.component';
// import {} from '@angular/material'
import { TooltipModule } from 'ng2-tooltip-directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InvoicesComponent } from './invoices/invoices.component';
import { SaferoomComponent } from './saferoom/saferoom.component';
import { BeachComponent } from './beach/beach.component';
import { ForestComponent } from './forest/forest.component';
import { HouseComponent } from './house/house.component';
import { MallComponent } from './mall/mall.component';
import { ProfileComponent } from './profile/profile.component';
import { TrendingComponent } from './trending/trending.component';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { ProfilesiteComponent } from './profilesite/profilesite.component';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    NavbarComponent,
    NavdrawerComponent,
    WorkspacesComponent,
    FormComponent,
    FormTemplateComponent,
    WorkspaceComponent,
    InvoicesComponent,
    SaferoomComponent,
    BeachComponent,
    ForestComponent,
    HouseComponent,
    MallComponent,
    TrendingComponent,
    ProfileComponent,
    TrendingComponent,
    ResumeBuilderComponent,
    ProfilesiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatTooltipModule,
    TooltipModule,
		ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
	],
providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
