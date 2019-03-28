import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/news';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { ActionSheetController } from '@ionic/angular';

@Component({
	selector: 'app-news',
	templateUrl: './news.component.html',
	styleUrls: [ './news.component.scss' ]
})
export class NewsComponent implements OnInit {
	@Input() article: Article;
	@Input() index: number;

	constructor(
		private inappbrowser: InAppBrowser,
		private actionSheetCtrl: ActionSheetController,
		private socialCtrl: SocialSharing
	) {}

	ngOnInit() {}

	launch() {
		const browser = this.inappbrowser.create(this.article.url, '_system');
	}

	async more() {
		const actionSheet = await this.actionSheetCtrl.create({
			buttons: [
				{
					text: 'Share',
					icon: 'share',
					cssClass: 'action-dark',
					handler: () => {
						console.log('Share clicked');
						this.socialCtrl.share(this.article.title, this.article.source.name, '', this.article.url);
					}
				},
				{
					text: 'Favorite',
					icon: 'star',
					cssClass: 'action-dark',
					handler: () => {
						console.log('Favorite clicked');
					}
				},
				{
					text: 'Cancel',
					icon: 'close',
					role: 'cancel',
					cssClass: 'action-dark',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		await actionSheet.present();
	}
}
