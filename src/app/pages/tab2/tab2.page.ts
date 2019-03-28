import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, IonInfiniteScroll } from '@ionic/angular';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/news';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: [ 'tab2.page.scss' ]
})
export class Tab2Page implements OnInit {
	@ViewChild(IonSegment) segment: IonSegment;
	@ViewChild(IonInfiniteScroll) scroll: IonInfiniteScroll;

	news: Article[] = [];
	categories = [ 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technolog' ];

	constructor(private newsService: NewsService) {}

	ngOnInit() {
		this.segment.value = this.categories[0];
		this.get(this.segment.value);
	}

	segmentChanged(ev: CustomEvent) {
		this.news = [];
		this.scroll.disabled = false;

		this.get(ev.detail.value);
	}

	async loadData(ev) {
		await this.get(this.segment.value, ev);
	}

	async get(cat: string, ev?) {
		this.newsService.getTopHeadlineWithCategory(cat).subscribe((resp) => {
			if (ev) {
				ev.target.complete();
				if (resp.articles.length === 0) {
					ev.target.disabled = true;
					return;
				}
			}
			this.news.push(...resp.articles);
		});
	}
}
