import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { WorkspacesComponent } from './workspaces/workspaces.component';
import { WorkspaceComponent } from './workspace/workspace.component';
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


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'beach',
    component: BeachComponent
  },
  {
    path: 'forest',
    component: ForestComponent
  },
  {
    path: 'house',
    component: HouseComponent
  },
  {
    path: 'mall',
    component: MallComponent
  },
  {
    path: 'saferoom',
    component: SaferoomComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'workspaces',
    component: WorkspacesComponent
  },
  {
    path: 'workspace',
    component: WorkspaceComponent
  },
  {
    path: 'invoices',
    component: InvoicesComponent
  },
  {
    path: 'trending',
    component: TrendingComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'resumeform',
    component: ResumeBuilderComponent
  },
  {
    path: 'profilesite',
    component: ProfilesiteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
