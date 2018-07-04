import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SearchPage } from '../search/search';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  scan()
  {
    // this.rut = 'asdfasdf';
    // console.log(this.rut)
    this.barcodeScanner.scan({
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : false, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            // saveHistory: true, // Android, save scan history (default false)
            prompt : "Place a barcode inside the scan area", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: false // iOS and Android
        }).then((barcodeData:any) => {
          console.log('Barcode data', barcodeData);

          if (barcodeData.format === "PDF_417"){

            let rut =  barcodeData.text.slice(0, 9);
            alert("Cedula identidad Antigua\n" +
                  "Cedula Numero: " + rut + "\n" +
                  "Format: " + barcodeData.format + "\n" +
                  "Cancelled: " + barcodeData.cancelled);
            this.navCtrl.push(SearchPage);
          }

          if (barcodeData.format === "QR_CODE"){

            let parser = document.createElement('a');
                parser.href = barcodeData.text;

                // parser.protocol; // => "http:"
                // parser.host;     // => "example.com:3000"
                // parser.hostname; // => "example.com"
                // parser.port;     // => "3000"
                // parser.pathname; // => "/pathname/"
                // parser.hash;     // => "#hash"
                // parser.search;   // => "?search=test"
                // parser.origin;   // => "http://example.com:3000"

                let rut = parser.search.split('&')[0].replace(/\D/g,'');

            alert("Cedula identidad Nueva\n" +
                  "Cedula Numero: " + rut + "\n" +
                  "Format: " + barcodeData.format + "\n" +
                  "Cancelled: " + barcodeData.cancelled);
            this.navCtrl.push(SearchPage);
          }


    }).catch(err => {
        console.log('Error', err);
    });


  }

  input()
  {
  let prompt = this.alertCtrl.create({
    title: 'Hola operador',
    message: "Ingrese el rut en el campo de abajo por favor",
    inputs: [
      {
        name: 'Rut',
        type: 'number',
        placeholder: 'xxxxxx-x'
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        handler: data => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Buscar',
      handler: data => {
        console.log('Saved clicked');
        this.navCtrl.push(SearchPage);
      }
    }
    ]
  });
  prompt.present();
  }


}
