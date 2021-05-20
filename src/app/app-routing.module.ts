import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewsComponent } from './components/add-news/add-news.component';
//import { ListBookComponent } from './components/list-book/list-book.component';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  //{ path: 'list', component: ListBookComponent },
  { path: 'add', component: AddNewsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
