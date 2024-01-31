import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from './../services/data.service';
import { Component } from '@angular/core';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  notes: any = [];


  constructor(private dataService: DataService, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.dataService.getNotes().subscribe(
      res => {
        console.log(res);
        this.notes = res;
      }
    )
  }

  async openNote(note: any) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: note.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5
    });

    modal.present();
  }

  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Add Note',
      inputs: [
        {
          name: 'Title',
          placeholder: 'Type Title',
          type: 'text'
        },
        {
          name: 'Text',
          placeholder: 'Type Text',
          type: 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: res => {
            this.dataService.addNote({ text: res.text, title: res.title });
          }
        }
      ]
    });

    await alert.present();
  }


}
