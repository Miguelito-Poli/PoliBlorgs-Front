import { Component, OnInit } from '@angular/core';
import { news } from '../models/news';
import { NewsService } from '../services/news.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: news[];
  currentNews = null;
  msgError = '';
  closeModal: string;



  constructor(private newsService: NewsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.newsService.getCustomers().subscribe((data: news[]) => {

      this.news = data;

    });
  }

  triggerModal(content:any, val:news) {
    console.log("Val --> ",val);
    
    this.currentNews = val
    console.log("This --> ",this.currentNews.id);
    this.retrieveBook(this.currentNews.id)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  retrieveBook(val:string): void {
    this.newsService.get(val)
      .subscribe(
        data => {
          this.currentNews = data;
          //console.log(data);
        },
        error => {
          this.msgError =  error.message +' \n '+ error.error.message;
          console.log(error);
        });
  }

  deleteNewsById(val1: string): void {
    this.newsService.delete(val1)
      .subscribe(
        data => {
          this.refreshList();
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  updateBook(): void {
    this.newsService.update(this.currentNews.id, this.currentNews)
      .subscribe(
        data => {
          this.refreshList();
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }



  refreshList(): void {
    this.ngOnInit();
  }
}
