import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/news';
import { ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class DataLocalService {
	newsFavorites: Article[] = [];

	constructor(private storage: Storage, private toastCtrl: ToastController) {
		this.newsFavorites = [];
		this.favoritesGet();
	}

	async favoritesSet(n: Article) {
		if (!this.newsFavorites) {
			this.newsFavorites = new Array<Article>();
		}

		if (this.newsFavorites.find((x) => x.title === n.title)) return;
		this.newsFavorites.unshift(n);
		this.toastPresent('Saved to your favorites');
		return this.storage.set('favorites', this.newsFavorites);
	}

	async favoritesDelete(n: Article) {
		this.newsFavorites = this.newsFavorites.filter((x) => x.title != n.title);
		this.toastPresent('Removed from your favorites');
		return this.storage.set('favorites', this.newsFavorites);
	}
	async favoritesGet() {
		const f = await this.storage.get('favorites');
		if (f == null) this.newsFavorites = new Array<Article>();
		this.newsFavorites = f;
	}

	async toastPresent(message: string) {
		const t = await this.toastCtrl.create({ message, duration: 2000 });
		t.present();
	}
}
