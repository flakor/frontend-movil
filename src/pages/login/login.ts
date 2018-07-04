import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { AuthProvider } from '../../providers/auth-service/auth-service';
import { Auth } from '../../models/auth/auth.model' ;




@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('username') user;
  @ViewChild('password') password;



  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private authSrv: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }
  login(){

    const newAuth:Auth = {
      username: this.user.value,
      password: this.password.value
    };
    // console.log(newAuth);
    this.authSrv.getToken(newAuth)
     .subscribe(auth => {
       console.log(auth.success);
       if(auth.success === true){
         localStorage.setItem('myToken', 'Bearer '+auth.token);
         this.navCtrl.push(WelcomePage);
       }else{
           let alert = this.alertCtrl.create({
             title: 'Datos incorrectos',
             subTitle: 'Los datos ingresados son incorrectos.',
             buttons: ['OK']
           });
           alert.present();
         }

     });

    }
}
