import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewComponent } from './template/new/new.component';
import { EditComponent } from './template/edit/edit.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'new', component: NewComponent },
  { path: 'edit', component: EditComponent },
  { path: '',   redirectTo: '/new', pathMatch: 'full' }, // redirect to `new template`
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
