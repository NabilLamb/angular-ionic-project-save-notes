import { Component, Input, OnInit } from '@angular/core';
import { DataService, Note } from '../services/data.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input()

  id!: string;

  note!: Note;

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.dataService.getNoteById(this.id).subscribe(
      res => {
        this.note = res;
      }
    );
  }

  async updateNote() {
    this.dataService.updateNote(this.note);
    const toast = await this.toastCtrl.create(
      {
        message: 'Note updated!',
        duration: 1000
      }
    );
    toast.present()
  }

  async deleteNote() {
    await this.dataService.deleteNote(this.note);
    this.modalCtrl.dismiss()
  }

}
