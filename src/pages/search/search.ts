import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PeopleProvider } from '../../providers/people-service/people-service';
import { People } from '../../models/people/people.model' ;
import { Titulos } from '../../models/people/people.model' ;
import { Datos } from '../../models/people/people.model' ;


@IonicPage()

@Component({
  templateUrl: 'search-details.html',
})
export class NavigationDetailsPage {

  item;
  numbers;

  constructor(params: NavParams) {

    this.item = params.data.item;

    let newArray = [];

    for (let i = 0; i < params.data.item.count; i++) {
       newArray.push(i);
    }

    this.numbers = newArray;


  }
}

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',

})
export class SearchPage implements OnInit{
  peoples: People[];
  titulos: Titulos[];
  datos: Datos[];
  items = [];



  constructor(public navCtrl: NavController, public navParams: NavParams, private peopleSrv: PeopleProvider) {


    this.peopleSrv.getPeoples()
     .subscribe(peoples => {

       this.datos = peoples.datos;
       this.titulos = peoples.titulos;
        let mapped = Object.keys(peoples).map(key => ({type: key, value: peoples[key], count: peoples[key].length}));
        mapped.splice(0, 1);

        this.peoples = mapped


     });
  }
  openNavDetailsPage(item) {


   this.navCtrl.push(NavigationDetailsPage, { item: item });

  }
  ngOnInit() {
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
