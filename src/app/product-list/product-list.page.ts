import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  list: any;


  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    var query = this.db.database.ref('products');
    query.once("value")
      .then(
        s => console.log(s.exportVal())
      )
  }

}

