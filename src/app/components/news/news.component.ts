import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/news';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { ActionSheetController, Platform, ToastController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';
import { ActionSheetButton } from '@ionic/core';

@Component({
	selector: 'app-news',
	templateUrl: './news.component.html',
	styleUrls: [ './news.component.scss' ]
})
export class NewsComponent implements OnInit {
	@Input() article: Article;
	@Input() index: number;
	@Input() isFavorites: boolean;

	constructor(
		private inappbrowser: InAppBrowser,
		private actionSheetCtrl: ActionSheetController,
		private socialCtrl: SocialSharing,
		private datalocalService: DataLocalService,
		private plaformCtrl: Platform,
		private toastCtrl: ToastController
	) {}

	ngOnInit() {}

	launch() {
		const browser = this.inappbrowser.create(this.article.url, '_system');
	}

	async more() {
		let favoritesAddRem: ActionSheetButton;
		if (this.isFavorites)
			favoritesAddRem = {
				text: 'Remove',
				icon: 'trash',
				cssClass: 'action-dark',
				handler: () => {
					console.log('Favorite remove');
					try {
						this.datalocalService.favoritesDelete(this.article);
					} catch (error) {}
				}
			};
		else
			favoritesAddRem = {
				text: 'Favorite',
				icon: 'star',
				cssClass: 'action-dark',
				handler: () => {
					try {
						this.datalocalService.favoritesSet(this.article);
					} catch (error) {}
				}
			};

		const actionSheet = await this.actionSheetCtrl.create({
			buttons: [
				{
					text: 'Share',
					icon: 'share',
					cssClass: 'action-dark',
					handler: () => {
						this.share();
					}
				},
				favoritesAddRem,
				{
					text: 'Cancel',
					icon: 'close',
					role: 'cancel',
					cssClass: 'action-dark',
					handler: () => {}
				}
			]
		});
		await actionSheet.present();
	}

	share() {
		if (this.plaformCtrl.is('cordova')) {
			this.socialCtrl.share(this.article.title, this.article.source.name, '', this.article.url);
		} else {
			if (navigator['share']) {
				navigator
					['share']({
						title: this.article.title,
						text: this.article.source.name,
						url: this.article.url
					})
					.then(() => {
						console.log('Successful share');
						this.toastPresenter('Successful share');
					})
					.catch((error) => {
						console.log('Error sharing', error);
						this.toastPresenter('Ups, we couldnt share the news =(');
					});
			} else {
				this.toastPresenter('Ups, we couldnt share the news =(');
			}
		}
	}

	async toastPresenter(message: string) {
		const toast = await this.toastCtrl.create({
			message,
			duration: 2000
		});
		toast.present();
	}
}
