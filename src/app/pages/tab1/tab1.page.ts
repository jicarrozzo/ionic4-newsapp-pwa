import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/news';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: [ 'tab1.page.scss' ]
})
export class Tab1Page implements OnInit {
	news: Article[] = [];

	constructor(private newsService: NewsService) {}

	ngOnInit() {
		this.get();
	}

	async loadData(ev) {
		await this.get(ev);
		ev.target.complete();
	}

	async get(ev?) {
		this.newsService.getTopHeadline().subscribe((resp) => {
			if (resp.articles.length === 0 && ev) {
				ev.target.disabled = true;
				ev.target.complete();
				return;
			}
			this.news.push(...resp.articles);
		});
	}
}
