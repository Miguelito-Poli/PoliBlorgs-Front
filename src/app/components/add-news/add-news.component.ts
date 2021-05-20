import { Component, OnInit } from '@angular/core';
import { news } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  news = new news();
  submitted = false;
  msgError = 'F Mi loco. No pudiste insertar la noticia';

  constructor(private newsservice: NewsService) { }

  ngOnInit(): void {
  }

  saveNew(): void {
    const data = {
      id: this.news.id,
      author: this.news.author,
      date: this.news.date,
      title: this.news.title,
      body: this.news.body
    };

    this.newsservice.create(data)
    .subscribe(
        response => {
          this.submitted=true;
          console.log(response);
        },
        error => {
          this.msgError  = error.message +' \n '+ error.error.message;
          console.log(error);
        });
      }

  newBook() {
    this.submitted = false;
    this.news.id = null;
    this.news.author = null;
    this.news.date = null;
    this.news.title = null;
    this.news.body = null;
  }

}
